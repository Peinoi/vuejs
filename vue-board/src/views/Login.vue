<template>
  <div class="post-form">
    <h3>로그인</h3>
    <form @submit.prevent="loginHandler">
      <div>
        <label for="id">아이디</label>
        <input type="text" id="id" name="id" v-model="id" required />
      </div>
      <div>
        <label for="pass">비밀번호</label>
        <input type="password" id="pass" name="pass" v-model="pass" required />
      </div>

      <!-- 로그인 실패 메시지 표시 -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <div class="button-container">
        <button type="submit">로그인</button>
      </div>
    </form>

    <!-- 목업 계정 정보 표시 -->
    <div class="mock-info">
      <h4>사용 가능한 테스트 계정</h4>
      <ul>
        <li>**관리자:** ID: test, Pass: 1234</li>
        <li>**일반 회원:** ID: user01, user02, user03 (Pass: 1234)</li>
      </ul>
      <p class="warning-text">
        **참고:** 이 계정 정보는 `localStorage` 대신 In-Memory 데이터로 관리됩니다.
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
// Pinia 스토어 경로를 확인하고 임포트합니다.
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const id = ref("test"); // 초기값 비우기
const pass = ref("1234"); // 초기값 비우기
const errorMessage = ref(""); // 에러 메시지를 표시할 상태

const loginHandler = async () => {
  errorMessage.value = ""; // 시도 시 에러 메시지 초기화

  if (!id.value || !pass.value) {
    errorMessage.value = "아이디와 비밀번호를 모두 입력해주세요.";
    console.error(errorMessage.value);
    return;
  }

  const success = await authStore.login({ id: id.value, pass: pass.value });

  if (success) {
    // 로그인 성공 시 메인 페이지로 이동
    router.push("/");
  } else {
    // 실패 시 사용자에게 알림 (alert() 대신 커스텀 메시지 사용)
    errorMessage.value = "로그인 정보가 올바르지 않습니다. (테스트 계정 정보를 확인해주세요.)";
    console.error("로그인 정보가 올바르지 않습니다.");
  }
};
</script>
<style scoped>
/* 폼 전체 컨테이너 스타일 (post-form 클래스 재사용) */
.post-form {
  max-width: 400px;
  margin: 80px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* 제목 (h3) 스타일 */
h3 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 2px solid #eeeeee;
}

/* 각 입력 필드 그룹 */
form > div {
  margin-bottom: 25px;
}

/* 라벨 스타일 */
label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333333;
  font-size: 0.95rem;
}

/* 입력 필드 (input) 스타일 */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #dddddd;
  border-radius: 6px;
  font-size: 1rem;
  color: #333;
  box-sizing: border-box;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

/* 입력 필드 포커스 시 스타일 (강조) */
input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.2);
  outline: none;
}

/* 버튼 컨테이너 */
.button-container {
  margin-top: 30px;
}

.button-container button {
  display: block;
  width: 100%;
  padding: 15px;
  background-color: #42b983;
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button-container button:hover {
  background-color: #36a477;
}

/* 에러 메시지 스타일 */
.error-message {
  color: #e74c3c;
  background-color: #fcecec;
  border: 1px solid #e74c3c;
  padding: 10px;
  border-radius: 6px;
  margin-top: -10px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 500;
}

/* 목업 정보 섹션 스타일 */
.mock-info {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px dashed #dddddd;
  font-size: 0.9rem;
  color: #555;
}

.mock-info h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #2c3e50;
}

.mock-info ul {
  list-style: none; /* 불릿 제거 */
  padding-left: 0;
}

.mock-info li {
  margin-bottom: 5px;
  line-height: 1.5;
  background-color: #f9f9f9;
  padding: 8px 12px;
  border-radius: 4px;
}

.warning-text {
  margin-top: 15px;
  color: #999;
  font-size: 0.8rem;
  text-align: center;
}
</style>
