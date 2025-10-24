<template>
  <li v-bind:class="{ complted: todo.complted }">
    <span v-on:click="handleToggle">{{ todo.text }}</span>
    <TodoItemButton v-bind:item-id="todo.id" />
  </li>
</template>
<script setup>
import { defineProps, inject } from "vue";
import TodoItemButton from "./TodoItemButton.vue";

const toggleComplete = inject("toggleComplete");

const props = defineProps({
  todo: { type: Object, required: true },
});

const handleToggle = () => {
  toggleComplete(props.todo.id);
};
</script>
<style scoped>
.complted span {
  text-decoration: line-through;
  color: gray;
}
</style>
