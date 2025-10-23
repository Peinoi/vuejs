<template>
  <section class="box">
    <h3>{{ title }}</h3>
    <p>{{ content }}</p>
    <p><button v-on:click="onClick">자식컴포넌트에서 임의값 생성</button></p>
  </section>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
defineProps({
  title: { type: String, required: true },
  content: { type: String, required: true, default: "반갑습니다." },
});
//defineEmits => 상위컴포넌트에서 하위 컴포넌트로 전달하는 사용자 정의 이벤트
const emit = defineEmits(["callStartPoint"]);
const onClick = (e) => {
  console.log("emit click");
  // console.log(e.target.parentElement.parentElement.children[0].innerText);
  emit("callStartPoint", e.target.parentElement.parentElement.children[0].innerText);
};
</script>
<style scoped>
section {
  border: green 1px solid;
  margin: 10px;
}
</style>
