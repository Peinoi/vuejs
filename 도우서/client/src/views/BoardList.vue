<template>
  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>No.</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일자</th>
          <th>댓글 수</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="count > 0">
          <tr
            v-for="boardInfo of boardList"
            v-bind:key="boardInfo.no"
            @click="goToBoardInfo(boardInfo.no)"
          >
            <td>{{ boardInfo.no }}</td>

            <td>{{ boardInfo.title }}</td>

            <td>{{ boardInfo.writer }}</td>
            <td>{{ dateFormat(boardInfo.created_dt, "yyyy-MM-dd") }}</td>
            <td>{{ boardInfo.comment_count }}</td>
          </tr>
        </template>
        <tr v-else>
          <td>표시할 내용 없음</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import dateFormat from "@/utils/dateFormat.js";
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import BoardInfo from "@/views/BoardInfo.vue";
const boardList = ref([]);
const router = useRouter();
const count = computed(() => {
  return boardList.value.length;
});
const board = async () => {
  const response = await axios.get("http://localhost:3000/boards");
  boardList.value = response.data;
};

onMounted(() => {
  board();
});
const goToBoardInfo = (no) => {
  let obj = {};
  for (let i = 0; i < boardList.value.length; i++) {
    if (boardList.value[i].no === no) {
      obj.no = boardList.value[i].no;
      obj.title = boardList.value[i].title;
      obj.content = boardList.value[i].content;
      obj.writer = boardList.value[i].writer;
      obj.created_dt = boardList.value[i].created_dt;
    }
  }

  console.log(obj);
  // router.push("/BoardInfo");
  router.push({
    name: "/BoardInfo",
    params: {
      ...obj,
    },
  });
};
// import { onMounted, ref } from "vue";
// import { useBoardStore } from "@/stores/board";

// const List = ref(useBoardStore());
// onMounted(async () => {
//   await List.value.fetchBoard();
// });
// const boardList = ref(List);
</script>
