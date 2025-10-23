//
<template>
  NO: <input type="number" v-model="no" /><br />
  이름: <input type="text" v-model="name" /><br />
  연락처: <input type="text" v-model="phone" /><br />
  <button v-on:click="addNewElement">추가</button><br />
  <p v-for="[no, person] in mapRef" v-bind:key="person">
    키:{{ no }} , 이름:{{ person.name }} 연락처:{{ person.phone }}
  </p>
</template>
<script setup>
import { reactive, ref } from "vue";

//Map =>( 키 , 값) ,{ 키 :값}

//변수
let no = ref(0);
let name = ref("");
let phone = ref("010-0000-0000");
const addNewElement = () => {
  if (!no.value || !name.value) {
    alert("번호, 이름을 입력하세요");
    return;
  }
  mapRef.set(Number(no.value), { name: name.value.trim(), phone: phone.value });
  no = ref(0);
  name = ref("");
};
const map = new Map();
map.set(1, { name: "홍길동", phone: "010-1111-1111" });
map.set(2, { name: "김명식", phone: "010-2222-2222" });
map.set(3, { name: "박명동", phone: "010-3333-3333" });

const mapRef = reactive(map);

console.log(map.get(1));
</script>
