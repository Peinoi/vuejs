<template>
  <h3>Todo List(Provide/Inject)</h3>
  <TodoInput>
    <template v-slot:header>
      <h3>글등록header</h3>
    </template>
    <template v-slot:footer>
      <h3>글등록footer</h3>
    </template>
    <template v-slot="">
      <h3>기본 slot</h3>
    </template>
  </TodoInput>
  <ul>
    <TodoItemContainer v-for="todo in todos" v-bind:key="todo.id" v-bind:todo="todo" />
  </ul>
</template>

<script setup>
import { reactive, provide } from "vue";
import TodoInput from "./TodoInput.vue";
import TodoItemContainer from "./TodoItemContainer.vue";

//데이터.
const todoData = [
  { id: 1, text: "Vue.js 이해하기", complted: false },
  { id: 2, text: "Provide/Inject 처리", complted: true },
];
let nextId = 3;

const todos = reactive(todoData);
//함수.
const addTodo = (newText) => {
  if (!newText) {
    return;
  }
  todos.push({ id: nextId++, text: newText, complted: false });
};

const toggleComplete = (id) => {
  const todo = todos.find((t) => t.id == id);
  if (todo) {
    todo.complted = !todo.complted;
  }
};

const removeTodo = (id) => {
  const index = todos.findIndex((t) => t.id === id);
  if (index !== -1) todos.splice(index, 1);
};

//provides 하위컴퍼넌트 전역변수처럼 참조 가능하게
provide("todos", todos);
provide("addTodo", addTodo);
provide("toggleComplete", toggleComplete);
provide("removeTodo", removeTodo);
</script>
