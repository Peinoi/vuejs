<script setup>
import { RouterView } from "vue-router";
import { provide, reactive } from "vue";
import axios from "axios";

//요청 서버 : http://localhost:5173
//제공 서버 : http://localhost:3000
axios
  //사용시 반드시 node.js의 서버가 열려 있어야함.
  .get("http://localhost:3000/customers")
  .then(function (response) {
    // 성공 핸들링
    // console.log(response.data);
    // response.data.forEach((data) => {
    //   memberList.set(data.id, data);
    // });
  })
  .catch(function (error) {
    // 에러 핸들링
    console.log(error);
  });

const memberList = new Map();
memberList.set(33456, {
  id: 33456,
  name: "김길동",
  email: "bow@email.com",
  point: 35,
  note: "신규가입특전",
});
memberList.set(47783, {
  id: 47783,
  name: "김철수",
  email: "mue@email.com",
  point: 53,
});

provide("memberList", reactive(memberList));
</script>

<template>
  <header>
    <h1>Vue 라우터 샘플</h1>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
main {
  border: blue 1px solid;
  padding: 10px;
}

#breadcrums ul li {
  display: inline;
  list-style: none;
}
#breadcrums {
  margin-left: 0;
}

#breadcrums ul {
  padding-left: 0;
}
#breadcrums .current {
  color: red;
}

#breadcrums ul li::before {
  content: " > ";
}
#breadcrums ul li:first-child::before {
  content: none;
}
</style>
