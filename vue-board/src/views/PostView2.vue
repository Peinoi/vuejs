<template>
  <h3>상세화면</h3>
  <div>
    <h3>제목: {{ post.title }}</h3>
    <p>내용: {{ post.content }}</p>
    <p>
      <em>작성자: {{ post.writer }}</em>
    </p>
    <p>작성일시: {{ writeDate }}</p>
    <p><button v-on:click="deletePostHandler">삭제</button></p>
    <RouterLink to="/">목록으로</RouterLink>
  </div>
</template>
<script setup>
import { onBeforeMount, computed } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { usePostStore } from "@/stores/post";
// import { getPostById } from "@/stores/post";

const route = useRoute(); //라우트 정보 접근
const router = useRouter(); //라우터 인스턴스 접근
//store 사용
const postStore = usePostStore();
//State, Getter 사용
const post = computed(() => {
  return postStore.getPostById(route.params.id);
});

const writeDate = computed(() => {
  if (post.value.write_date) {
    return new Date(post.value.write_date).toLocaleString();
  }
  return "";
});

onBeforeMount(async () => {
  await postStore.fetchPosts(); //게시물 목록을 미리 가져옴
});

//삭제 핸들러
const deletePostHandler = async () => {
  const postId = route.params.id;
  await postStore.deletePost(postId);
  router.push("/");
};
</script>
<style scoped>
/* 상세화면 컨테이너 스타일 */
div > div {
  max-width: 800px; /* 상세 내용의 최대 너비 제한 */
  margin: 40px auto; /* 중앙 정렬 및 상하 간격 */
  padding: 30px;
  background-color: #f9f9f9; /* 배경색을 살짝 회색으로 */
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* 은은한 그림자 */
  line-height: 1.6; /* 가독성을 위한 줄 간격 */
  border: 1px solid green;
}

/* 제목 (post.title) 스타일 */
h3:nth-of-type(2) {
  /* 두 번째 h3 (제목: ...) */
  font-size: 1.8rem;
  color: #2c3e50; /* 어두운 색상 */
  padding-bottom: 15px;
  margin-bottom: 20px;
  border-bottom: 2px solid #eee; /* 제목 아래 구분선 */
}

/* 내용 (post.content) 스타일 */
p:nth-of-type(1) {
  /* 내용: ... */
  font-size: 1.1rem;
  color: #333;
  min-height: 100px; /* 내용이 짧아도 어느 정도 영역 확보 */
  padding: 20px 0;
  white-space: pre-wrap; /* 내용에 줄 바꿈이 포함되도록 처리 */
  border-bottom: 1px dashed #ddd; /* 내용과 작성자 정보 사이 점선 구분 */
}

/* 작성자, 작성일시 정보 스타일 */
p:nth-of-type(2),
p:nth-of-type(3) {
  /* 작성자, 작성일시 */
  font-size: 0.9rem;
  color: #777;
  text-align: right;
  margin-top: 10px;
}

em {
  /* 작성자 강조 */
  font-style: normal;
  font-weight: bold;
  color: #42b983; /* 포인트 색상 */
}

/* 삭제 버튼 스타일 */
button {
  background-color: #e74c3c; /* 빨간색 (위험/삭제) */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
  margin-right: 15px; /* 목록으로 링크와의 간격 */
}

button:hover {
  background-color: #c0392b;
}

/* RouterLink (목록으로) 스타일 */
a {
  text-decoration: none;
  color: #2980b9; /* 파란색 계열로 변경하여 버튼과 구분 */
  font-weight: bold;
  padding: 10px 20px;
  border: 1px solid #2980b9;
  border-radius: 6px;
  display: inline-block; /* 버튼 옆에 나란히 배치 */
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

a:hover {
  background-color: #2980b9;
  color: white;
}

/* 버튼/링크 그룹을 감싸는 p 태그 */
p:nth-of-type(4) {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
  text-align: center; /* 버튼과 링크 중앙 정렬 */
}
</style>
