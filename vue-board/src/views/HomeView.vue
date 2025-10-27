<script setup>
//피니어를 이용한 함수 호출
import { onMounted } from "vue";
import { storeToRefs } from "pinia"; //반응형 모듈 피니어가 가지고 있는거
import { usePostStore } from "@/stores/post";
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";

const postStore = usePostStore();
//State , Getter 값 사용
const { posts } = storeToRefs(postStore);
const { fetchPosts } = postStore;
onMounted(async () => {
  await fetchPosts();
});
</script>

<template>
  <div>
    <h3>게시판</h3>

    <PostForm />
    <PostList v-bind:posts="posts" />
  </div>
</template>
