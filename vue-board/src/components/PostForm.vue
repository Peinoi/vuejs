<template>
  <div class="post-form">
    <h3>글작성</h3>
    <!-- 로그아웃 링크를 누르면 authStore.logout()을 실행하고 로그인 페이지로 이동합니다. -->
    <RouterLink
      v-if="authStore.isLoggedIn"
      to="/login"
      @click.prevent="logoutHandler"
      class="logout-link"
    >
      로그아웃 ({{ authStore.currentWriter }})
    </RouterLink>
    <RouterLink v-else to="/login" class="logout-link"> 로그인 </RouterLink>

    <form @submit.prevent="addPostHandler">
      <!-- 에러 메시지 표시 -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <div class="class-form">
        <label for="title">제목</label>
        <input type="text" id="title" name="title" v-model="title" required />
      </div>
      <div class="class-form">
        <label for="content">내용</label>
        <textarea type="text" id="content" name="content" v-model="content" required></textarea>
      </div>
      <div class="class-form">
        <label for="writer">작성자</label>
        <!-- 
          로그인 상태인 경우: v-model="writer" (자동 입력), readonly 설정
          로그아웃 상태인 경우: v-model="writer" (수동 입력), readonly 해제
        -->
        <input
          type="text"
          id="writer"
          name="writer"
          v-model="writer"
          :readonly="isWriterFieldDisabled"
          :class="{ 'disabled-field': isWriterFieldDisabled }"
          required
        />
        <p v-if="isWriterFieldDisabled" class="hint-text">로그인 정보로 자동 입력됩니다.</p>
      </div>

      <button type="submit">작성</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, RouterLink } from "vue-router";
// Pinia store 에서 addPost 함수 주입
import { usePostStore } from "@/stores/post";
import { useAuthStore } from "@/stores/auth"; // Auth Store 추가

const router = useRouter();
const postStore = usePostStore(); // pinia 스토어 사용
const authStore = useAuthStore(); // Auth Store 인스턴스

const { addPost } = postStore; // addPost 함수 추출

// 폼 데이터 상태 관리
const title = ref("");
const content = ref("");
// [핵심 변경] 로그인 정보가 있다면 currentWriter로 초기값 설정, 없으면 빈 문자열
const writer = ref(authStore.currentWriter || "");
const errorMessage = ref(null);

// 작성자 필드 비활성화 (읽기 전용) 여부를 계산
const isWriterFieldDisabled = computed(() => !!authStore.currentWriter);

// 로그아웃 핸들러
const logoutHandler = () => {
  authStore.logout();
  router.push("/login");
};

// 폼 제출 핸들러
const addPostHandler = async () => {
  errorMessage.value = null; // 에러 메시지 초기화

  // 작성자 필드도 검사 (로그아웃 상태일 경우 수동 입력해야 함)
  if (!title.value || !content.value || !writer.value) {
    errorMessage.value = "모든 필드를 작성해주세요.";
    console.error(errorMessage.value);
    return;
  }

  // 로그인 상태에서 writer 필드를 실수로 변경했을 경우, Pinia의 writer로 강제 설정
  const finalWriter = authStore.currentWriter || writer.value;

  const newPost = {
    title: title.value,
    content: content.value,
    writer: finalWriter,
  };

  await addPost(newPost);

  // 폼 초기화 (writer는 로그인 상태에 따라 다시 초기화됨)
  title.value = "";
  content.value = "";

  // 게시글 목록 페이지로 이동
  router.push("/");
};
</script>

<style scoped>
/* 폼 전체 컨테이너 스타일 */
.post-form {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  position: relative; /* 로그아웃 링크 위치 지정을 위해 */
}

/* 로그아웃 링크 스타일 */
.logout-link {
  position: absolute;
  top: 15px;
  right: 25px;
  font-size: 0.9rem;
  color: #42b983;
  text-decoration: none;
  font-weight: 600;
  padding: 5px 10px;
  border: 1px solid #42b983;
  border-radius: 4px;
  transition: all 0.2s;
}

.logout-link:hover {
  background-color: #42b983;
  color: white;
}

h3 {
  margin-top: 0;
  margin-bottom: 40px;
  text-align: center;
  color: #2c3e50;
  font-size: 2rem;
}

/* 에러 메시지 스타일 */
.error-message {
  color: #e74c3c;
  background-color: #fcecec;
  border: 1px solid #e74c3c;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 500;
}

/* 각 입력 필드 그룹 */
.class-form {
  margin-bottom: 20px;
}

/* 라벨 스타일 */
label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #2c3e50;
  font-size: 1rem;
}

/* 입력 필드 (input, textarea) 공통 스타일 */
input[type="text"],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  font-size: 1rem;
  color: #333;
  box-sizing: border-box;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

/* 읽기 전용 필드 스타일 */
.disabled-field {
  background-color: #f5f5f5; /* 회색 배경 */
  color: #777;
  cursor: not-allowed;
}

.hint-text {
  font-size: 0.85rem;
  color: #42b983;
  margin-top: 5px;
  margin-bottom: 0;
}

/* textarea 전용 스타일 */
textarea {
  resize: vertical;
  min-height: 150px;
}

/* 입력 필드 포커스 시 스타일 */
input[type="text"]:focus,
textarea:focus {
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.2);
  outline: none;
}

/* 제출 버튼 스타일 */
button[type="submit"] {
  display: block;
  width: 100%;
  padding: 15px;
  margin-top: 30px;
  background-color: #42b983;
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.1s ease;
  letter-spacing: 1px;
}

button[type="submit"]:hover {
  background-color: #36a477;
}

button[type="submit"]:active {
  transform: translateY(1px);
}
</style>
