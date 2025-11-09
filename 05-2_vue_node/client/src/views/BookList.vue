<template>
  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>No.</th>
          <th>도서명</th>
          <th>저자</th>
          <th>출판사</th>
          <th>출판일자</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(book, i) in bookList" @click="goToDetail(book.no)">
          <td>{{ book.no }}</td>
          <td>{{ book.name }}</td>
          <td>{{ book.writer }}</td>
          <td>{{ book.publisher }}</td>
          <td>{{ getDateFormat(book.publication_date,'yyyy-mm-dd') }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRouter } from 'vue-router'
import {onMounted, ref } from "vue";
const router = useRouter()
const bookList = ref([]);
const goToDetail = (bno) => {
  router.push({ name: 'bookInfo', query: { no: bno } })
}
const book = async () => {
  const response = await axios.get("http://localhost:3000/books");
  bookList.value = response.data;
  console.log(bookList.value);
};
onMounted(() => {
  book();
});

const getDateFormat =(datevalue,format) => {
  let date = new Date(datevalue);
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let result = format.replace("yyyy", year).replace("mm", month).replace("dd", day);
  return result;
}
</script>
<style scoped>
table * {
  text-align: center;
}
</style>
