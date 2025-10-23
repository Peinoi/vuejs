<template>
  <textarea v-bind:rows="rCount" v-model="textAreaInput"></textarea>
  <p v-html="textAreaInput.replace(/\n/g, `<br>`)"></p>
  <br />
  <select v-model="memberType">
    <option value="일반">일반회원</option>
    <option value="우수">우수회원</option>
    <option value="특별">특별회원</option>
  </select>
  <p>{{ memberType }}</p>
  <br />
  <section>
    <label> <input type="checkbox" name="os" v-model="selectOS" value="1" />macOS </label>
    <label> <input type="checkbox" name="os" v-model="selectOS" value="2" />windowOS </label>
    <label> <input type="checkbox" name="os" v-model="selectOS" value="3" />LinuxOS</label>
  </section>
  <p>{{ selectOS }}</p>
  <section>
    <label> <input type="radio" name="selectedOS" v-model="selectedOS" value="1" />macOS </label>
    <label> <input type="radio" name="selectedOS" v-model="selectedOS" value="2" />Windows </label>
    <label> <input type="radio" name="selectedOS" v-model="selectedOS" value="3" />Linux </label>
  </section>
  <p>{{ selectedOS }}</p>
</template>
<script setup>
import { ref } from "vue";
// new RegExp(), /Test/
// new Array(), []
const rCount = ref(5);
const textAreaInput = ref("입력하세요>");
const memberType = ref("일반");
const selectOS = ref([]);
const selectedOS = ref([]);
</script>
