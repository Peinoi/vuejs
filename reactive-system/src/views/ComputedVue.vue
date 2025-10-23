<script setup>
//CompositionAPI / OptionAPI
import { ref, computed } from "vue";
//데이터 => 화면 자동 refresh
const radiusInit = Math.round(Math.random() * 10);
const radius = ref(radiusInit);
const PI = ref(3.14);

//계산된 속성
const area = computed(() => {
  return radius.value * radius.value * PI.value;
});

//반응형 데이터(radius)를 변경하면 화면에 refresh
setInterval(() => {
  radius.value = Math.round(Math.random() * 10);
}, 5000);
</script>

<template>
  <p>반지름이 {{ radius }}이고 원주율 {{ PI }}인 원의 면적은 {{ area }}</p>
</template>

<style scoped></style>
