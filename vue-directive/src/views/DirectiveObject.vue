<template>
  <p>이름 <input type="text" v-model="fname" /></p>
  <p>나이 <input type="number" v-model="fage" /></p>
  <p><button v-on:click="frindeAdd">친구 추가</button></p>
  <p>Finfo이름 <input type="text" v-model="finfo.name" /></p>
  <p>Finfo나이 <input type="number" v-model="finfo.age" /></p>
  <p><button v-on:click="infoadd">친구 추가Finfo</button></p>
  <table>
    <thead>
      <tr>
        <th>이름</th>
        <th>나이</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="frined in frineds" v-bind:key="frined">
        <td>{{ frined.name }}</td>
        <td>{{ frined.age }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { reactive, ref } from "vue";

//data
const frineds = reactive([
  { name: "홍길동", age: 20 },
  { name: "김민식", age: 21 },
]);
let fname = ref("");
let fage = ref(20);

let finfo = reactive({
  name: fname.value,
  age: fage.value,
});

const frindeAdd = () => {
  const obj = { name: fname.value, age: fage.value };
  frineds.push(obj);
  fname = ref("");
  fage = ref();
};
const infoadd = () => {
  const obj = { name: finfo.name, age: finfo.age };
  frineds.push(obj);
  finfo.name = ref("");
  finfo.age = ref();
};
</script>
