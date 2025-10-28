<template>
  <div class="reply-form-container">
    <h4>댓글 작성</h4>
    <div v-if="authStore.isLoggedIn" class="reply-form">
      <p class="writer-info">
        작성자: <strong>{{ authStore.currentWriter }}</strong>
      </p>
      <form @submit.prevent="addReplyHandler">
        <textarea v-model="comment" placeholder="댓글을 입력하세요..." rows="4" required></textarea>
        <button type="submit">댓글 등록</button>
      </form>
    </div>
    <div v-else class="login-prompt">
      <p>댓글을 작성하려면 <RouterLink to="/login">로그인</RouterLink>이 필요합니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useReplyStore } from "@/stores/reply";

const props = defineProps({
  boardId: {
    type: [Number, String],
    required: true,
  },
});

const authStore = useAuthStore();
const replyStore = useReplyStore();

const comment = ref("");

const addReplyHandler = async () => {
  if (!comment.value.trim()) {
    console.error("댓글 내용을 입력해주세요.");
    return;
  }

  if (!authStore.currentWriter) {
    console.error("작성자 정보가 없습니다. 로그인해주세요.");
    return;
  }

  const newReply = {
    comment: comment.value,
    writerComments: authStore.currentWriter, // 로그인한 사용자의 writer 정보를 사용
    board_id: props.boardId,
  };

  try {
    await replyStore.addReply(newReply);
    comment.value = ""; // 폼 초기화
  } catch (error) {
    console.error("댓글 등록 중 오류 발생:", error);
    alert("댓글 등록에 실패했습니다.");
  }
};
</script>

<style scoped>
/* 폼 컨테이너 */
.reply-form-container {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

h4 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 15px;
}

/* 로그인 정보 */
.writer-info {
  margin-bottom: 10px;
  font-size: 0.95rem;
  color: #666;
}

.writer-info strong {
  color: #42b983;
}

/* 폼 요소 */
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  resize: vertical;
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

textarea:focus {
  border-color: #42b983;
  outline: none;
}

button[type="submit"] {
  float: right;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #36a477;
}

/* 로그인 안내 */
.login-prompt {
  text-align: center;
  padding: 20px;
  border: 1px solid #ffeeba;
  background-color: #fff3cd;
  color: #856404;
  border-radius: 8px;
}
.login-prompt a {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}
</style>
