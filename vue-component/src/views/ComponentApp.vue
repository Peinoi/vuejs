<template>
  <h1>컴포넌트 기초</h1>
  <p>{{ startName }}/ 별점{{ startPoint }}</p>
  <button v-on:click="createStartPoint">입력값 생성</button>
  <section>
    <h2>컴포넌트 1개</h2>
    <OneSection
      title="홍기도로롱"
      content="반갑습니다로롱"
      v-on:callStartPoint="createStartPoint"
    />
  </section>
  <section>
    <h2>컴포넌트 여러개</h2>
    <OneSection
      v-for="[no, item] in mapData"
      v-bind:key="no"
      v-bind:title="item.title"
      v-bind:content="item.content"
      v-on:callStartPoint="createStartPoint"
    ></OneSection>
  </section>
</template>
<script setup>
import { ref } from "vue";
import OneSection from "../components/OneSection.vue";

const fName = ref("김길동");
const fContent = ref("Hello, world");
const startName = ref("초기값");
console.log(fName, fContent);
const mapData = new Map();
mapData.set(1, { title: "홍길동", content: "안녕하세요" });
mapData.set(2, { title: "김민교", content: "Hello" });
mapData.set(3, { title: "김상우", content: "Good Monrning" });

const startPoint = ref(Math.ceil(Math.random() * 5));
const createStartPoint = (name) => {
  console.log("createStartPoint Run");
  startPoint.value = Math.ceil(Math.random() * 5);
  startName.value = name;
};
</script>
<style>
section {
  border: green 1px dashed;
  margin: 10px;
}
</style>
