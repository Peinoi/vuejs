<template>
  <p>세로 {{ height }}, 가로 {{ width }}인 사각형의 면적은 {{ area }}</p>
  <button v-on:click="change">값을 변경</button>
</template>

<script setup>
import {
  ref,
  computed,
  onBeforeMount,
  onBeforeUpdate,
  onUpdated,
  onRenderTracked,
  onRenderTriggered,
  onMounted,
} from "vue";
const heigthData = Math.round(Math.random() * 10);
const widthData = Math.round(Math.random() * 10);
const height = ref(heigthData);
const width = ref(widthData);

const area = computed(() => {
  return width.value * height.value;
});
const change = () => {
  height.value = Math.round(Math.random() * 10);
  width.value = Math.round(Math.random() * 10);
};

onBeforeMount(() => {
  console.log(`onBeforeMount calleed: ${height.value} * ${width.value}`);
});
onMounted(() => {
  console.log(`onMounted calleed: ${height.value} * ${width.value}`);
});
onUpdated(() => {
  console.log(`onUpdated calleed: ${height.value} * ${width.value}`);
});
onBeforeUpdate(() => {
  console.log(`onBeforeUpdate calleed: ${height.value} * ${width.value}`);
});
onRenderTracked(() => {
  console.log(`onRenderTracked calleed: ${height.value} * ${width.value}`);
});
onRenderTriggered(() => {
  console.log(`onRenderTriggered calleed: ${height.value} * ${width.value}`);
});
</script>
