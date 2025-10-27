import { ref, computed } from "vue";
import { defineStore } from "pinia";

// use + counter + store => useCounterStore 선언
export const useCounterStore = defineStore("counter", () => {
  const count = ref(0); //state
  const doubleCount = computed(() => count.value * 2); //getter 계산 속성 변경
  function increment() {
    //action : 상태값을 변경
    count.value++;
  }

  return { count, doubleCount, increment };
});
