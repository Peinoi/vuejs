<template>
  <div class="container">
    <div class="row">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col" class="text-center table-primary">번호</th>
            <td scope="col" class="text-center">{{ bookInfo.no }}</td>
            <th scope="col" class="text-center table-primary">도서명</th>
            <td scope="col" class="text-center">{{ bookInfo.name }}</td>
            <th scope="col" class="text-center table-primary">저자</th>
            <td scope="col" class="text-center">{{ bookInfo.writer }}</td>
          </tr>

          <tr>
            <th colspan="1" class="text-center table-primary">출판사</th>
            <td colspan="2" class="text-center">{{ bookInfo.publisher }}</td>
            <th colspan="1" class="text-center table-primary">출판일자</th>
            <td colspan="2" class="text-center">
              {{ getDateFormat(bookInfo.publication_date,'yyyy-mm-dd') }}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colspan="6" class="text-center table-primary">책 소개</th>
          </tr>
          <tr>
            <td colspan="6" class="text-left" valign="top" height="200">
              <pre
                style="
                  white-space: pre-wrap;
                  border: none;
                  background-color: white;
                "
                >{{ bookInfo.info }}</pre
              >
            </td>
          </tr>
          <tr>
            <td colspan="6" class="text-center">
              <button
                class="btn btn-xs btn-info"
                @click="goToUpdateForm(bookInfo.no)"
              >
                수정
              </button>
              <router-link to="/list" class="btn btn-xs btn-success"
                >목록</router-link
              >
              <button
                class="btn btn-xs btn-warning"
                @click="deleteBook(bookInfo.no)"
              >
                삭제
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from "axios";

const route = useRoute()
let bookInfo = ref({})
const getBookInfo = async (bno) => {
  let result = await axios.get(`http://localhost:3000/book/${bno}`).catch((err) => console.log(err))
  bookInfo.value = result.data[0]
  console.log(result.data[0])
}
onMounted(() => {
  let boardNo = route.query.no
  getBookInfo(boardNo)
})



const getDateFormat =(datevalue,format) => {
  let date = new Date(datevalue);
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let result = format.replace("yyyy", year).replace("mm", month).replace("dd", day);
  return result;
}
</script>