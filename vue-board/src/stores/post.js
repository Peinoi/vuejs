import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const usePostStore = defineStore("post", () => {
  const posts = ref([]); // state

  //getter : 가공된 state 반환
  const getPostById = (id) => {
    return posts.value.find((post) => post.id === parseInt(id));
  };

  //action : 데이터 밴경
  //추가
  const addPost = async (newPost) => {
    const result = await axios.post("http://localhost:3000/board", { param: newPost });

    posts.value.push({ ...newPost, id: result.data.insertId });
  };
  //삭제
  const deletePost = async (id) => {
    await axios.delete(`http://localhost:3000/board/${id}`);

    posts.value = posts.value.filter((post) => post.id !== id);
  };
  //조회
  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:3000/boards");
    posts.value = response.data;
  };
  //수정
  const modify = async (newPost) => {
    const result = await axios.put(`http://localhost:3000/board`, { param: newPost });
    const updatedData = result.data;
    const index = posts.value.findIndex((post) => post.id === updatedData.id);
    if (index !== -1) {
      posts.value[index] = updatedData; // 로컬 상태 업데이트
    }
    return updatedData;
  };
  return { posts, getPostById, addPost, deletePost, fetchPosts, modify };
});
