<template>
  <h3>회원관리</h3>
  <nav id="breadcrums">
    <ul>
      <li><RouterLink v-bind:to="{ name: 'AppTop' }">TOP</RouterLink></li>
      <li><RouterLink v-bind:to="{ name: 'MemberList' }">회원리스트</RouterLink></li>
      <li>회원상세정보</li>
    </ul>
  </nav>
  <section>
    <h3>회원상세정보</h3>
    <dl>
      <dt>ID</dt>
      <dd>{{ member.id }}</dd>
      <dt>이름</dt>
      <dd>{{ member.name }}</dd>
      <dt>메일</dt>
      <dd>{{ member.email }}</dd>
      <dt>연락처</dt>
      <dd>{{ member.phone }}</dd>
      <dt>주소</dt>
      <dd>{{ member.address }}</dd>
    </dl>
  </section>
</template>
<script setup>
import { defineProps, ref, inject } from "vue";
import axios from "axios";

const props = defineProps({ id: Number });
// const memberList = inject("memberList");
//const member = memberList.get(props.id);
const member = ref({});
axios
  //사용시 반드시 node.js의 서버가 열려 있어야함.
  .get("http://localhost:3000/customers/" + props.id)
  .then((resp) => {
    // 성공 핸들링
    console.log(resp);
    member.value = resp.data[0];
  })
  .catch(function (error) {
    console.log(error);
  });
</script>
