<template>
  <div class="container">
    <table class="table">
      <tbody>
        <tr>
          <th class="text-right">번호</th>
          <td class="text-center">{{ boardInfo.no }}</td>
        </tr>
        <tr>
          <th class="text-right">작성일</th>
          <td class="text-center">{{ dateFormat(boardInfo.created_dt, 'yyyy-MM-dd') }}</td>
        </tr>
        <tr>
          <th class="text-right">제목</th>
          <td class="text-center">{{ boardInfo.title }}</td>
        </tr>
        <tr>
          <th class="text-right">이름</th>
          <td class="text-center">{{ boardInfo.writer }}</td>
        </tr>
        <tr>
          <th class="text-right">내용</th>
          <td class="text-center">{{ boardInfo.content }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <button class="btn btn-primary" @click="goToboardUpdate(boardInfo)">수정</button>
    </div>
    <hr />
  </div>
  <CommentComponent v-bind:no="no" />
</template>

<script setup>
import CommentComponent from '../components/CommentComponent.vue'
import dateFormat from '@/utils/dateFormat.js'
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
//컴포넌트 호출 라우터
//호출된 컴포넌트 라우트
//현재는 보드리스트에서 받는거니 라우트
const route = useRoute()
let boardInfo = ref({})
const getBoardInfo = async (bno) => {
  let result = await axios.get(`/api/boards/${bno}`).catch((err) => console.log(err))
  boardInfo.value = result.data
}
onBeforeMount(() => {
  let boardNo = route.query.no
  getBoardInfo(boardNo)
})

//수정으로 정보 발송
const router = useRouter()
const goToboardUpdate = (board) => {
  router.push({ name: 'boardUpdate', query: board })
}
</script>
