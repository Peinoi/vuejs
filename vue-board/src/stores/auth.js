import { defineStore } from "pinia";
import { ref, computed } from "vue";

// *** 중요: Canvas 환경에서는 localStorage 사용이 금지되어 있습니다. ***
// *** 따라서 사용자가 요청한 고정 계정 목록을 In-Memory JavaScript 배열로 대체하여 구현합니다. ***

// 사용자 요청에 따른 목업 계정 목록
const MOCK_USERS = [
  { id: "test", pass: "1234", writer: "test", authority: "admin" },
  { id: "user01", pass: "1234", writer: "user01", authority: "user" },
  { id: "user02", pass: "1234", writer: "user02", authority: "user" },
  { id: "user03", pass: "1234", writer: "user03", authority: "user" },
];

export const useAuthStore = defineStore("auth", () => {
  // 상태 (State)
  const loggedInUser = ref(null); // 현재 로그인한 사용자 정보 (예: { id: 'user1', writer: '홍길동' })

  // 게터 (Getter 역할을 하는 computed property)
  const isLoggedIn = computed(() => !!loggedInUser.value);
  const currentWriter = computed(() => loggedInUser.value?.writer || null);
  // authority 필드를 반환합니다.
  const authority = computed(() => loggedInUser.value?.authority || null);

  // 액션 (Actions)

  // 1. 로그인 처리 (In-Memory 목업 계정과의 비교)
  const login = async (loginData) => {
    try {
      // 1. MOCK_USERS 배열에서 아이디와 비밀번호가 모두 일치하는 사용자 찾기
      const user = MOCK_USERS.find((u) => u.id === loginData.id && u.pass === loginData.pass);

      if (user) {
        // 2. 로그인 성공 시 상태 업데이트
        // [핵심 수정] authority 필드를 user 객체에서 가져와 loggedInUser에 저장합니다.
        loggedInUser.value = {
          id: user.id,
          writer: user.writer, // 게시글 작성자와 비교할 'writer' 이름을 설정
          authority: user.authority, // <--- 이 필드를 추가했습니다!
        };
        console.log("로그인 성공:", loggedInUser.value.writer);
        return true;
      } else {
        throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 실패:", error.message);
      return false;
    }
  };

  // 2. 로그아웃 처리
  const logout = () => {
    loggedInUser.value = null;
    console.log("로그아웃 완료");
  };

  return { loggedInUser, isLoggedIn, currentWriter, authority, login, logout };
});
