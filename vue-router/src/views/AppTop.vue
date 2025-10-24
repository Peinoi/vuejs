<template>
  <h3>TOP 페이지</h3>
  <nav id="breadcrums">
    <ul>
      <li>TOP</li>
    </ul>
  </nav>
  <section>
    <p><RouterLink v-bind:to="{ name: 'MemberList' }">회원관리는 여기서</RouterLink></p>
  </section>
</template>
<script setup>
import { RouterLink } from "vue-router";
</script>
