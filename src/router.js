import { createRouter, createWebHistory } from "vue-router";

import Login from "./pages/Login.vue"

const routes = [{ path: "/", component: Login }];

const history = createWebHistory();

const router = createRouter({
      history,
      routes,
});

export default router;
