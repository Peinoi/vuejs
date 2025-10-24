<template>
  <button v-on:click="handleDelete">삭제</button>
</template>
<script setup>
import { inject, defineProps } from "vue";

const props = defineProps({
  itemId: { type: Number, required: true },
});

const removeTodo = inject("removeTodo");
const handleDelete = () => {
  removeTodo(props.itemId);
};
</script>
