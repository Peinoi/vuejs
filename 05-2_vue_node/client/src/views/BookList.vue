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
          <td>{{ getDateFormat(book.publication_date) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table * {
  text-align: center;
}
</style>
