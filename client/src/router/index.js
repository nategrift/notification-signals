import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/projects",
    name: "Projects",
    component: function () {
      return import(/* webpackChunkName: "projects" */ "../views/Projects.vue");
    },
  },
  {
    path: "/register",
    name: "Register",
    component: function () {
      return import(/* webpackChunkName: "register" */ "../views/Register.vue");
    },
  },
  {
    path: "/login",
    name: "Login",
    component: function () {
      return import(/* webpackChunkName: "login" */ "../views/Login.vue");
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
