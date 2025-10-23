<script setup>
//Vue.js 특징 1. 데이터 변경 -> 화면 (Dom update) refresh
import { ref, reactive, computed } from "vue";

const url = ref("https://vuejs.org/");
const isDisabled = ref(true);
const imgAttributes = reactive({
  src: "/src/assets/logo.svg",
  alt: "Vue 기본 로고",
  width: "150px",
});
const styleAttribute = reactive({
  color: "pink",
  backColor: "green",
});
const msg = ref("Hellow World");
const isTxtColorRed = ref(true);
const isTxtbgColorBlue = ref(true);
const classStyle = reactive({
  txtColorRed: true,
  bgColorBlue: false,
  txtSize24: true,
});
let isRedTrue = ref(true);
let isBlueTrue = ref(true);
const computedStyles = computed(() => {
  // isRedTrue = ref(Math.round(Math.random())); // 0, '', null => falsy
  // isBlueTrue = ref(Math.round(Math.random()));
  // isRedTrue = isRedTrue == 0 ? true : false;
  // isBlueTrue = isRedTrue == 0 ? true : false;
  return { txtColorRed: isRedTrue.value, bgColorBlue: isBlueTrue.value };
});

setInterval(() => {
  const isRed = ref(Math.round(Math.random())); // 0, '', null => falsy
  const isBlue = ref(Math.round(Math.random()));
  isRedTrue = isRed;
  isBlueTrue = isBlue;
  console.log(isRed, isBlue);
}, 3000);
</script>
<template>
  <p>
    <a
      v-bind:href="url"
      v-bind:style="{ color: styleAttribute.color, backgroundColor: styleAttribute.backColor }"
      >Vue.js사이트</a
    >
  </p>
  <p><a v-bind:href="url + 'guide/introduction.html'">Vue.js 가이드 페이지</a></p>
  <p><button v-bind:disabled="isDisabled">클릭</button></p>
  <p><img v-bind="imgAttributes" /></p>
  <p v-bind:class="{ txtColorRed: isTxtColorRed, bgColorBlue: isTxtbgColorBlue }">{{ msg }}</p>
  <p v-bind:class="{ txtColorPink: isTxtColorRed, bgColorBlue: isTxtbgColorBlue }">{{ msg }}</p>
  <p v-bind:class="classStyle">{{ msg }}</p>
  <p v-bind:class="computedStyles">{{ msg }}</p>
</template>
<style scoped>
.txtColorRed {
  color: red;
}
.txtColorPink {
  color: pink;
}
.bgColorBlue {
  background-color: blue;
}
.txtSize24 {
  font-size: 24px;
}
</style>
