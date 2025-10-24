<template>
  <h3>회원관리</h3>
  <nav id="breadcrums">
    <ul>
      <li><RouterLink v-bind:to="{ name: 'AppTop' }">TOP</RouterLink></li>
      <li><RouterLink v-bind:to="{ name: 'MemberList' }">회원리스트</RouterLink></li>
      <li>회원 정보 추가</li>
    </ul>
  </nav>
  <section>
    <h3>회원정보추가</h3>
    <p>회원정보를 입력하고 추가버튼을 클릭하세요.</p>
    <form v-on:submit.prevent="onAdd">
      <dl>
        <dt>
          <label for="">id</label>
        </dt>
        <dd>
          <input type="number" v-model.number="member.id" />
        </dd>
        <dt>
          <label for="">이름</label>
        </dt>
        <dd>
          <input type="text" v-model="member.userid" />
        </dd>
        <dt>
          <label for="">메일</label>
        </dt>
        <dd>
          <input type="mail" v-model="member.email" />
        </dd>
        <dt>
          <label for="">비밀번호</label>
        </dt>
        <dd>
          <input type="password" v-model="member.password" />
        </dd>
        <dt>
          <label for="">연락처</label>
        </dt>
        <dd>
          <input type="text" v-model="member.phone" />
        </dd>
      </dl>
      <button type="submit">회원 추가</button>
    </form>
  </section>
</template>

<script setup>
import { reactive, inject } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import axios from "axios";

// const memberList = inject("memberList");

//사용시 반드시 node.js의 서버가 열려 있어야함.

//data
const member = reactive({
  userid: "",
  password: "",
  email: "",
  phone: "",
});

const memberList = inject("memberList");
//함수
const onAdd = () => {
  // memberList.set(member.id, member);
  // //목록이동
  axios
    .post("http://localhost:3000/signup", member)
    .then((resp) => {
      // 성공 핸들링
      console.log(resp.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  router.push({ name: "MemberList" });
};
</script>
