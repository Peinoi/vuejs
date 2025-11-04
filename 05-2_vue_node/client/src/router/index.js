import { createRouter, createWebHistory } from "vue-router";
import MainComponent from "@/views/MainComponent.vue";
import BookList from "../views/BookList.vue";
import BookInfo from "../views/BookInfo.vue";
import BookForm from "../views/BookForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: MainComponent,
    },
    {
      path: "/list",
      name: "bookList",
      component: BookList,
    },
    {
      path: "/info",
      name: "bookInfo",
      component: BookInfo,
    },
    {
      path: "/form",
      name: "bookForm",
      component: BookForm,
    },
  ],
});

export default router;
