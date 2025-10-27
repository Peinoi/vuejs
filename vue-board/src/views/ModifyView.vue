<template>
  <div class="post-form">
    <h3>글 수정</h3>
    <form v-on:submit.prevent="addPostHandler">
      <div class="class-form">
        <label for="title">제목</label>
        <input type="text" id="title" name="title" v-model="title" required />
      </div>
      <div class="class-form">
        <label for="content">내용</label>
        <textarea type="text" id="content" name="content" v-model="content" required></textarea>
      </div>
      <div class="class-form">
        <label for="id">아이디</label>
        <input type="text" id="id" name="id" v-model="id" required :disabled="true" />
      </div>

      <div class="post-form">
        <button type="submit">수정</button>
        <RouterLink
          v-if="post"
          :to="{ name: 'PostView', params: { id: post.id } }"
          class="back-link"
        >
          <button type="button" class="list-button">상세 보기로 돌아가기</button>
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onBeforeMount, computed, ref } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { usePostStore } from "@/stores/post";

const route = useRoute(); // 라우트 정보 접근
const router = useRouter(); // 라우터 인스턴스 접근
const postStore = usePostStore();

// 폼 입력 필드를 위한 반응형 상태 정의
const title = ref("");
const content = ref("");
const id = ref(""); // 💡 id 상태 추가

// 기존 게시물 데이터 가져오기 (Getter 사용)
const post = computed(() => {
  // 라우트 파라미터의 ID를 사용하여 해당 게시물을 가져옵니다.
  return postStore.getPostById(route.params.id);
});

onBeforeMount(async () => {
  // 게시물 목록을 미리 가져옴 (store의 fetchPosts 구현에 따라 필요)
  await postStore.fetchPosts();

  // 💡 데이터가 로드된 후, 폼 상태를 기존 게시물 데이터로 초기화
  if (post.value) {
    title.value = post.value.title;
    content.value = post.value.content;
    // **라우트 파라미터에서 넘어온 id를 폼의 id 상태에 할당합니다.**
    id.value = route.params.id;
  } else {
    // 게시물을 찾을 수 없을 경우 처리 (예: 홈으로 리다이렉트)
    console.error("게시물을 찾을 수 없습니다.");
    // router.push("/");
  }
});

// 수정 핸들러
const addPostHandler = async () => {
  const updatedPost = {
    id: id.value, // 라우트에서 가져와 할당된 ID (key 역할)
    title: title.value, // 수정된 제목
    content: content.value, // 수정된 내용
  };

  try {
    // 💡 postStore에 updatePost 액션이 정의되어 있어야 합니다.
    await postStore.modify(updatedPost);
    // 수정 후 해당 게시물 상세 페이지로 이동
    router.push(`/`);
  } catch (error) {
    console.error("게시물 수정 중 오류 발생:", error);
    alert("게시물 수정에 실패했습니다.");
  }
};
</script>

<style scoped>
/* 기존 스타일은 유지 */
a {
  text-decoration: none;
  color: green;
  font-weight: bold;
}

/* 폼 전체 컨테이너 스타일 */
form {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

/* 각 입력 필드 그룹 */
form div {
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

/* id 필드를 비활성화했을 때의 스타일 추가 */
input[type="text"]:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
  color: #888;
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

/* 버튼 공통 스타일 */
button {
  display: inline-block;
  padding: 15px 25px;
  margin-top: 30px;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.1s ease;
  letter-spacing: 1px;
  width: auto; /* 버튼 너비 조정 */
  margin-right: 10px;
}

/* 제출 버튼 스타일 */
button[type="submit"] {
  background-color: #42b983;
  color: white;
}

button[type="submit"]:hover {
  background-color: #36a477;
}

/* 삭제 버튼 스타일 */
.delete-button {
  background-color: #e74c3c;
  color: white;
}

.delete-button:hover {
  background-color: #c0392b;
}

/* 목록 버튼 스타일 */
.list-button {
  background-color: #3498db;
  color: white;
}

.list-button:hover {
  background-color: #2980b9;
}

button:active {
  transform: translateY(1px);
}
</style>
