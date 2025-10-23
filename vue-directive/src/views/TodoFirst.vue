<script setup>
import { ref, reactive } from "vue";
const url = ref("https://vuejs.org/");

const welcomeMsg = ref("나의 첫 웹페이지");
const content = ref("HTML과 CSS로 만든 기본 구조");
const data = reactive({
  welcome: "환영합니다.",
  content: "이 페이지는 HTML과 CSS로 만들어졌으며, 기본적인 구조와 스타일을 포함하고 있습니다.",
});
</script>

<template>
  <div id="container">
    <header>
      <h1>{{ welcomeMsg }}</h1>
      <p>{{ content }}</p>
    </header>
    <main>
      <h2>{{ data.welcome }}</h2>
      <p>{{ data.content }}</p>
      <ul>
        <h4>내용 예시</h4>
        <li>간단한 텍스트</li>
        <li>링크:<a v-bind:href="url">예시 사이트</a></li>
        <li>리스트 항목</li>
      </ul>
    </main>
    <footer>
      <p>@ 2025 나의 웹 페이지 모든 권리 보유</p>
    </footer>
  </div>
</template>

<style>
body {
  background-color: rgb(196, 196, 196);
}

header {
  background-color: rgb(37, 170, 37);
  text-align: center;
  padding: 20px;
  margin: 10px;
}
h1 {
  color: white;
  font-weight: bold;
}
header p {
  color: white;
}

main {
  background-color: white;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
}
ul {
  padding: 0;
}
footer {
  text-align: center;
  color: gray;
}
</style>
