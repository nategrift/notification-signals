import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store/index";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/project/:id",
    name: "project",
    component: () =>
      import(/* webpackChunkName: "project" */ "../views/ProjectView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/project/:id/edit",
    name: "edit-project",
    component: () =>
      import(
        /* webpackChunkName: "edit-project" */ "../views/EditProjectView.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
    meta: { requiresNoAuth: true },
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignupView.vue"),
    meta: { requiresNoAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: () =>
      import(/* webpackChunkName: "error" */ "../views/errors/ErrorView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  store.dispatch("setError", null);

  if (to.meta.requiresAuth && !store.state.auth.loggedIn) {
    return { name: "login", query: { target: to.fullPath } };
  } else if (to.meta.requiresNoAuth && store.state.auth.loggedIn) {
    return { name: "home" };
  }
});

export default router;
