import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useBoardStore = defineStore("board", () => {
  // state
  const boardList = ref([]);
  // getters
  const getPostById = (no) => {
    return boardList.value.find((board) => board.no === parseInt(no));
  };
  // actions

  const fetchBoard = async () => {
    const response = await axios.get("http://localhost:3000/boards");
    boardList.value = response.data;
  };

  return { boardList, fetchBoard, getPostById };
});
