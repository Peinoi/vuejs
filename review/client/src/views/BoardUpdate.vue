<template>
  <BoardForm>
    <template v-slot:no>
      <input class="form-control" type="text" v-model="boardInfo.no" readonly />
    </template>
    <template v-slot:title>
      <input class="form-control" type="text" v-model="boardInfo.title" />
    </template>
    <template v-slot:writer>
      <input class="form-control" type="text" v-model="boardInfo.writer" />
    </template>
    <template v-slot:content>
      <textarea class="form-control" v-model="boardInfo.content"></textarea>
    </template>
    <template v-slot:created_date>
      <input class="form-control" type="date" v-model="formattedDate" readonly />
    </template>
    <template v-slot:button>
      <button class="btn btn-info" @click="modifyBoard">저장</button>
    </template>
  </BoardForm>
</template>

<script setup>
import BoardForm from '@/components/BoardForm.vue'
import dateFormat from '@/utils/dateFormat'
import { onBeforeMount, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
//컴포넌트 호출 라우터
//호출된 컴포넌트 라우트
//현재는 보드리스트에서 받는거니 라우트
const route = useRoute()
const router = useRouter()
let boardInfo = ref({})
const formattedDate = computed(() => {
  return dateFormat(boardInfo.value.created_dt, 'yyyy-MM-dd')
})
const getBoardInfo = async (board) => {
  let result = await axios.get(`/api/boards/${board}`).catch((err) => console.log(err))
  boardInfo.value = result.data
}
onBeforeMount(() => {
  let boardNo = route.query.no
  getBoardInfo(boardNo)
})

const modifyBoard = async () => {
  let obj = {
    no: boardInfo.value.no,
    title: boardInfo.value.title,
    writer: boardInfo.value.writer,
    content: boardInfo.value.content,
    created_dt: formattedDate.value,
  }
  let result = await axios.put(`/api/boards/${obj.no}`, obj).catch((err) => console.log(err))
  const resData = result.data
  if (resData) {
    alert('게시글 수정이 성공했습니다.')
    router.push('/boardList')
  } else {
    alert('게시글 수정이 실패했습니다.')
  }
}
</script>
