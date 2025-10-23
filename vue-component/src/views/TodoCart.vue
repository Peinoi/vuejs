<template>
  <h2>🛒 장바구니</h2>

  <div style="margin-bottom: 1rem">
    <label>상품코드: <input type="text" v-model="code" /></label><br />
    <label>상품명: <input type="text" v-model="name" /></label><br />
    <label>가격: <input type="number" v-model="price" /></label><br />
    <label>수량: <input type="number" v-model="qty" /></label><br />
    <button @click="addItem">상품 추가</button>
  </div>

  <table border="1" cellspacing="0" cellpadding="5">
    <thead>
      <tr style="background-color: #eee">
        <th>상품코드</th>
        <th>상품명</th>
        <th>가격</th>
        <th>수량</th>
        <th>합계</th>
        <th>삭제</th>
      </tr>
    </thead>
    <tbody>
      <CartRow
        v-for="[pcode, item] in carts"
        :key="item.code"
        v-bind:item="item"
        v-bind:pcode="pcode"
        v-on:update-qty="applyTotalPrice"
        v-on:remove="removeItem"
      >
        <td>{{ item.code }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.price.toLocaleString() }}원</td>
        <td>
          <input
            type="number"
            v-on:change="applyTotalPrice(pcode, item)"
            v-model.number="item.qty"
            min="1"
            style="width: 60px"
          />
        </td>
        <td>{{ (item.price * item.qty).toLocaleString() }}원</td>
        <td><button v-on:click="removeItem(item.code)">❌</button></td>
      </CartRow>
    </tbody>
    <tfoot>
      <tr>
        <th colspan="4" style="text-align: right">총합계:</th>
        <th colspan="2">{{ totalAmount.toLocaleString() }}원</th>
      </tr>
    </tfoot>
  </table>
</template>

<script setup>
import { ref, computed, reactive, watch } from "vue";
import CartRow from "../components/CartRow.vue";

// 입력용 변수
const code = ref("P004");
const name = ref("마우스패드");
const price = ref(5500);
const qty = ref(1);

// 장바구니 배열 (reactive로 감싸기)
const cartData = new Map();
cartData.set("P001", { code: "P001", name: "무선마우스", price: 15000, qty: 1 });
cartData.set("P002", { code: "P002", name: "무선키보드", price: 20000, qty: 1 });
cartData.set("P003", { code: "P003", name: "유무선키보드", price: 25000, qty: 1 });

const carts = reactive(cartData);

// 상품 추가
const addItem = () => {
  if (!code.value || !name.value || price.value <= 0 || qty.value <= 0) {
    alert("모든 항목을 올바르게 입력하세요!");
    return;
  }
  // set 을 통해 추가.
  carts.set(code.value, { code: code.value, name: name.value, price: price.value, qty: qty.value });

  // 입력 초기화
  code.value = "";
  name.value = "";
  price.value = 0;
  qty.value = 1;
};

// 상품 삭제
const removeItem = (code) => {
  carts.delete(code);
};

const applyTotalPrice = (code, item) => {
  carts.set(code, { ...item });
};

// 총합계 계산
// const totalAmount = computed(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0));
let totalAmount = computed(() => {
  let amt = 0;
  for (let cart of carts.values()) {
    amt += cart.price * cart.qty;
  }
  return amt;
});

//watch 감시
watch(qty, (newVal, oldVal) => {
  console.log(newVal, oldVal);
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
input[type="text"],
input[type="number"] {
  margin: 3px 0;
}
button {
  margin-top: 5px;
}
</style>
