<template>
  <div class="post-form">
    <h3>글작성</h3>
    <form v-on:submit.prevent="addPostHandler">
      <div class="class-form">
        <label for="title">제목</label>
        <input type="text" id="title" name="title" v-model="title" required />
      </div>
      <div class="class-form">
        <label for="content">내용</label>
        <textarea type="text" id="content" name="content" v-model="content" required></textarea>
      </div>
      <div class="class-form">
        <label for="writer">작성자</label>
        <input type="text" id="writer" name="writer" v-model="writer" required />
      </div>

      <button type="submit">작성</button>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
//Pinia store 에서 addPost 함수 주입
import { usePostStore } from "@/stores/post";
const postStore = usePostStore(); //pinia 스토어 사용
const { addPost } = postStore; //addPost 함수 추출

//폼 데이터 상태 관리
const title = ref("");
const content = ref("");
const writer = ref("");

//폼 제출 홈들러
const addPostHandler = async () => {
  if (!title.value || !content.value || !writer.value) {
    alert("모든 필드를 작성해주세요.");
    return;
  }
  const newPost = {
    title: title.value,
    content: content.value,
    writer: writer.value,
  };
  await addPost(newPost);
  //폼초기화
  title.value = "";
  content.value = "";
  writer.value = "";
};
</script>
<style scoped>
/* 폼 전체 컨테이너 스타일 */
form {
  max-width: 600px; /* 폼의 최대 너비 제한 */
  margin: 40px auto; /* 중앙 정렬 및 상하 간격 */
  padding: 30px;
  background-color: #ffffff; /* 흰색 배경 */
  border-radius: 12px; /* 더 둥근 모서리 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08); /* 눈에 띄는 그림자 */
}

/* 각 입력 필드 그룹 */
form div {
  margin-bottom: 20px;
}

/* 라벨 스타일 */
label {
  display: block; /* 블록 요소로 만들어 입력창 위로 배치 */
  font-weight: 600;
  margin-bottom: 8px;
  color: #2c3e50; /* 어두운 색상 */
  font-size: 1rem;
}

/* 입력 필드 (input, textarea) 공통 스타일 */
input[type="text"],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #dcdcdc; /* 옅은 테두리 */
  border-radius: 6px;
  font-size: 1rem;
  color: #333;
  box-sizing: border-box; /* 패딩이 너비에 포함되도록 설정 */
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

/* textarea 전용 스타일 */
textarea {
  resize: vertical; /* 수직으로만 크기 조절 가능 */
  min-height: 150px; /* 최소 높이 지정 */
}

/* 입력 필드 포커스 시 스타일 */
input[type="text"]:focus,
textarea:focus {
  border-color: #42b983; /* VueJS 포인트 색상으로 테두리 변경 */
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.2); /* 은은한 포커스 효과 */
  outline: none; /* 기본 아웃라인 제거 */
}

/* 제출 버튼 스타일 */
button[type="submit"] {
  display: block;
  width: 100%; /* 너비를 폼에 맞게 확장 */
  padding: 15px;
  margin-top: 30px;
  background-color: #42b983; /* 포인트 색상 */
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.1s ease;
  letter-spacing: 1px;
}

button[type="submit"]:hover {
  background-color: #36a477; /* 호버 시 색상 약간 어둡게 */
}

button[type="submit"]:active {
  transform: translateY(1px); /* 클릭 시 살짝 눌리는 효과 */
}
</style>
