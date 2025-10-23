<script setup>
//CompositionAPI / OptionAPI
import { reactive, computed } from "vue";
//데이터 => 화면 자동 refresh
const data = reactive({
  PI: 3.14,
  radius: Math.round(Math.random() * 10),
});

//계산된 속성
const area = computed(() => {
  return data.radius * data.radius * data.PI;
});

//반응형 데이터(radius)를 변경하면 화면에 refresh
setInterval(() => {
  data.radius = Math.round(Math.random() * 10);
}, 5000);
</script>

<template>
  <p>반지름이 {{ data.radius }}이고 원주율 {{ data.PI }}인 원의 면적은 {{ area }}</p>
</template>
