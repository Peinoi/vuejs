<script setup>
import { RouterLink } from "vue-router";
// import { inject } from "vue";
import { ref } from "vue";
import axios from "axios";

// const memberList = inject("memberList");
const customers = ref([]);
//사용시 반드시 node.js의 서버가 열려 있어야함.
axios
  .get("http://localhost:3000/customers")
  .then((resp) => {
    // 성공 핸들링
    console.log(resp.data);
    customers.value = resp.data;
    console.log(customers.value);
  })
  .catch(function (error) {
    console.log(error);
  });
</script>
<template>
  <h3>회원관리</h3>
  <nav id="breadcrums">
    <ul>
      <li><RouterLink v-bind:to="{ name: 'AppTop' }">TOP</RouterLink></li>
      <li>회원리스트</li>
    </ul>
  </nav>
  <section>
    <h3>회원리스트</h3>
    <p>신규등록은 <RouterLink v-bind:to="{ name: 'MemberAdd' }">여기를</RouterLink>클릭</p>
    <ul>
      <li v-for="member in customers" v-bind:key="member.id">
        <RouterLink v-bind:to="{ name: 'MemberDetail', params: { id: member.id } }"
          >ID가 {{ member.id }}인 {{ member.name }}님</RouterLink
        >
      </li>
    </ul>
  </section>
</template>
