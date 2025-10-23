<template>
  <div>
    <button v-on:click="onClickFnc">클릭</button>
    <p>결과 : {{ randValue }}</p>
  </div>
  <p><input type="text" v-model="msg" /></p>
  <p v-bind:class="computedStyles">{{ msg }}</p>
</template>

<script setup>
import { computed, ref } from "vue";
const randValue = ref("시작 전");
const msg = ref("Hello, World");

const isRedFlag = ref(true);
const isBlueFlag = ref(true);

const computedStyles = computed(() => {
  return { txtColorRed: isRedFlag.value, bgColorBlue: isBlueFlag.value };
});

const onClickFnc = () => {
  console.log("a");
  const rand = Math.round(Math.random() * 100);
  randValue.value = rand;

  isRedFlag.value = rand > 50 ? true : false;
  isBlueFlag.value = rand > 50 ? true : false;
};
</script>
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
