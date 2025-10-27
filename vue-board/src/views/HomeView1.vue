<script setup>
import { onMounted, ref, provide } from "vue";
import axios from "axios";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";

//데이터 상태관리
const posts = ref([]);
//이벤트 훅
onMounted(async () => {
  //초기 데이터 로드 또는 기타 설정 작업 수행
  const result = await axios.get("http://localhost:3000/boards");
  console.log(result.data);
  posts.value = result.data;
});
//함수
const addPost = async (newPost) => {
  const result = await axios.post("http://localhost:3000/board", { param: newPost });

  posts.value.push({ ...newPost, id: result.data.id });
};

//provide
provide("addPost", addPost);
</script>

<template>
  <div>
    <h3>게시판</h3>

    <PostForm />
    <PostList v-bind:posts="posts" />
  </div>
</template>
