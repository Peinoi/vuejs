<template>
  <h3>게시글 목록</h3>
  <ul>
    <li v-for="post in posts" v-bind:key="post.id">
      <h4>
        <RouterLink v-bind:to="{ name: 'PostView', params: { id: post.id } }">{{
          post.title
        }}</RouterLink>
      </h4>
      <p>
        <RouterLink v-bind:to="{ name: 'ModifyView', params: { id: post.id } }">{{
          post.content
        }}</RouterLink>
      </p>
      <p>
        <em>작성자: {{ post.writer }}</em>
      </p>
    </li>
  </ul>
</template>
<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

defineProps({
  posts: {
    type: Array,
    required: true,
  },
});
</script>
<style scoped>
/* 전체 컨테이너 스타일 */
h3 {
  font-size: 1.8rem; /* 제목 크기 */
  color: #333; /* 제목 색상 */
  border-bottom: 3px solid #42b983; /* VueJS스러운 포인트 색상 */
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

/* 게시글 목록 (ul) 스타일 */
ul {
  list-style: none; /* 기본 불릿 제거 */
  padding: 0;
  margin: 0;
  display: grid; /* 그리드 레이아웃 사용 */
  gap: 20px; /* 항목 간 간격 */
}

/* 개별 게시글 항목 (li) 스타일 */
li {
  background-color: #ffffff; /* 배경 흰색 */
  border: 1px solid #e0e0e0; /* 옅은 테두리 */
  border-radius: 8px; /* 둥근 모서리 */
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); /* 은은한 그림자 */
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease; /* 호버 애니메이션 */
}

li:hover {
  transform: translateY(-5px); /* 호버 시 살짝 위로 이동 */
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1); /* 그림자 강조 */
}

/* 게시글 제목 (h4) 스타일 */
li h4 {
  font-size: 1.4rem;
  color: #2c3e50; /* 어두운 색상 */
  margin-top: 0;
  margin-bottom: 10px;
  font-weight: 600;
}

/* 게시글 내용 (p) 스타일 */
li p {
  color: #666; /* 회색 텍스트 */
  margin-top: 5px;
  margin-bottom: 5px;
  line-height: 1.6;
}

/* 작성자 정보 (em) 스타일 */
li p em {
  font-style: normal; /* 기울임꼴 제거 */
  color: #999; /* 더 옅은 회색 */
  font-size: 0.9rem;
  display: block; /* 줄 바꿈 */
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px dashed #eee; /* 구분선 */
}
a {
  text-decoration: none;
  color: green;
}
</style>
