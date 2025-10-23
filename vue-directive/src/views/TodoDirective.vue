<template>
  <div id="myDIV" class="header">
    <h2>My To Do List</h2>
    <input type="text" id="myInput" placeholder="Title..." v-model="title" />
    <span v-on:click="newElement()" class="addBtn">Add</span>
  </div>

  <ul id="myUL">
    <li
      v-for="[no, todo] in todoDataRef"
      v-bind:key="no"
      v-bind:class="{ checked: todo.checked }"
      v-on:click="cancelTodo(no)"
    >
      {{ todo.title }} <span class="close" v-on:click.stop="deleteTodo(no)">X</span>
    </li>
  </ul>
</template>
<script setup>
import { reactive, ref } from "vue";
//변수.
let title = ref("");

//Array
const todoAry = [];
todoAry.push({ no: 1, title: "Hit the gym", checked: false });
todoAry.push({ no: 2, title: "Pay bills", checked: true });
todoAry.push({ no: 3, title: "Pay bills", checked: false });

//Map
const todoData = new Map();
todoData.set(1, { title: "Hit the gym", checked: false });
todoData.set(2, { title: "Pay bills", checked: true });
todoData.set(3, { title: "Meet George", checked: false });
console.log(todoData.keys());
console.log(todoData.values());
const todoDataRef = reactive(todoData);

//추가
const newElement = () => {
  const newNo = newNumber();

  todoDataRef.set(newNo, { title: title.value.trim(""), checked: false });
  title = ref("");
};
const cancelTodo = (no) => {
  const todoItem = todoDataRef.get(no);
  todoItem.checked = !todoItem.checked;
};
//삭제
const deleteTodo = (no) => {
  console.log(no);
  todoDataRef.delete(no);
};

//번호 생성
const newNumber = () => {
  let maxNo = 0;
  for (let k of todoDataRef.keys()) {
    if (maxNo < k) {
      maxNo = k;
    }
  }
  return maxNo + 1;
};
</script>
<style scoped>
/* Include the padding and border in an element's total width and height */
* {
  box-sizing: border-box;
}

/* Remove margins and padding from the list */
ul {
  margin: 0;
  padding: 0;
}

/* Style the list items */
ul li {
  cursor: pointer;
  position: relative;
  padding: 12px 8px 12px 40px;
  background: #eee;
  font-size: 18px;
  transition: 0.2s;
  list-style: none;
  /* make the list items unselectable */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Set all odd list items to a different color (zebra-stripes) */
ul li:nth-child(odd) {
  background: #f9f9f9;
}

/* Darker background-color on hover */
ul li:hover {
  background: #ddd;
}

/* When clicked on, add a background color and strike out text */
ul li.checked {
  background: #888;
  color: #fff;
  text-decoration: line-through;
}

/* Add a "checked" mark when clicked on */
ul li.checked::before {
  content: "";
  position: absolute;
  border-color: #fff;
  border-style: solid;
  border-width: 0 2px 2px 0;
  top: 10px;
  left: 16px;
  transform: rotate(45deg);
  height: 15px;
  width: 7px;
}

/* Style the close button */
.close {
  position: absolute;
  right: 0;
  top: 0;
  padding: 12px 16px 12px 16px;
}

.close:hover {
  background-color: #f44336;
  color: white;
}

/* Style the header */
.header {
  background-color: #f44336;
  padding: 30px 40px;
  color: white;
  text-align: center;
}

/* Clear floats after the header */
.header:after {
  content: "";
  display: table;
  clear: both;
}

/* Style the input */
input {
  margin: 0;
  border: none;
  border-radius: 0;
  width: 75%;
  padding: 10px;
  float: left;
  font-size: 16px;
}

/* Style the "Add" button */
.addBtn {
  padding: 10px;
  width: 25%;
  background: #d9d9d9;
  color: #555;
  float: left;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 0;
}

.addBtn:hover {
  background-color: #bbb;
}
</style>
