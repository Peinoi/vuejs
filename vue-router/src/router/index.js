import { createRouter, createWebHistory } from "vue-router";
import AppTop from "@/views/AppTop.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "AppTop",
      component: AppTop,
    },
    {
      path: "/member/memberList",
      name: "MemberList",
      component: () => import("@/views/member/MemberList.vue"),
    },
    {
      path: "/member/detail:id",
      name: "MemberDetail",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/member/MemberDetail.vue"),
      props: (routes) => {
        const idNum = Number(routes.params.id);
        return {
          id: idNum,
        };
      },
    },
    {
      path: "/member/add",
      name: "MemberAdd",
      component: () => import("@/views/member/MemberAdd.vue"),
    },
  ],
});

export default router;
