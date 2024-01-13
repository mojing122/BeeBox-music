import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "@/stores/index.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "welcome",
      component: () => import("@/views/Welcome.vue"),
      children: [
        {
          path: "",
          name: "welcome-login",
          component: () => import("@/components/welcome/Login.vue"),
        },
        {
          path: "/register",
          name: "welcome-register",
          component: () => import("@/components/welcome/Register.vue"),
        },
        {
          path: "/forget",
          name: "welcome-forget",
          component: () => import("@/components/welcome/ForgetPW.vue"),
        },
      ],
    },
    {
      path: "/index",
      name: "index",
      component: () => import("@/views/Index.vue"),
      children: [
        {
          path: "",
          name: "HomePage",
          component: () => import("@/components/index/HomePage.vue"),
        },
        {
          path: "/searchResult",
          name: "SearchResult",
          component: () => import("@/components/index/SearchResult.vue"),
        },
        {
          path: "/listsPark",
          name: "ListsPark",
          component: () => import("@/components/index/ListsPark.vue"),
        },
        {
          path: "/musicsPark",
          name: "MusicsPark",
          component: () => import("@/components/index/MusicsPark.vue"),
        },
        {
          path: "/myLists",
          name: "MyLists",
          component: () => import("@/components/index/MyLists.vue"),
        },
        {
          path: "/listDetail/",
          name: "ListDetail",
          component: () => import("@/components/index/ListDetail.vue"),
        },
      ],
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/views/Admin.vue"),
      children: [
        {
          path: "",
          name: "AdminHome",
          component: () => import("@/components/admin/AdminHome.vue"),
        },
        {
          path: "/admin/uploadMusic",
          name: "UploadMusic",
          component: () => import("@/components/admin/UploadMusic.vue"),
        },
      ],
    },
  ],
});

/**
router.beforeEach((to, from, next) => {
  const store = useStore();
  if (store.auth.user != null && to.name.startsWith("welcome-")) {
    next("/index");
  } else if (store.auth.user == null && to.fullPath.startsWith("/index")) {
    next("/");
  } else if (to.matched.length === 0) {
    next("/index");
  } else {
    next();
  }
});
 */

export default router;
