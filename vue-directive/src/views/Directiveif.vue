<script setup>
import { ref } from "vue";
const score = ref(80);
const getRandomValue = () => {
  score.value = Math.round(Math.random() * 40) + 40;
};
const point = ref(100); //200이상 일반 , 300이상 우수
</script>
<template>
  <button v-on:click="getRandomValue">Random 점수</button>
  <p>{{ score }}</p>
  <p v-if="score >= 90">A학점</p>
  <p v-else-if="score >= 80">B학점</p>
  <p v-else-if="score >= 70">B학점</p>
  <p v-else>F학점</p>

  <input type="text" v-model="point" />
  <p v-if="point >= 300">점수 {{ point }}은 우수한 고객입니다.</p>
  <p v-else-if="point >= 200">점수 {{ point }}은 일반 고객입니다.</p>
  <p v-else>점수 {{ point }}은 신규 고객입니다.</p>
</template>
