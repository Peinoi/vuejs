<script setup>
import { ref } from "vue";
const ary = ["마우스", "키보드", "USB", "마우스패드"];
const itemList = ref(ary);
const friends = ref(["홍길동", "김명선"]);
let newFriend = ref("박우석");

const addNewFriend = () => {
  friends.value.push(newFriend.value.trim());
  newFriend = ref("");
};
</script>

<template>
  <ul>
    <li v-for="item in itemList" v-bind:key="item">{{ item }}</li>
  </ul>

  <p v-for="num in 3" v-bind:key="num">3 * {{ num }} = {{ 3 * num }}</p>
  친구이름:<input type="text" v-model="newFriend" v-on:change="addNewFriend" />
  <h3>친구목록</h3>
  <ul>
    <li v-for="name in friends" v-bind:key="name">{{ name }}</li>
  </ul>
</template>
