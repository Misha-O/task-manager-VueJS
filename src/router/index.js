import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/add",
    name: "AddProject",
    component: () =>
      import(/*webpackChunkName: "About"*/ "../views/AddProject.vue"),
  },
  {
    path: "/projects/:id",
    name: "EditProject",
    component: () =>
      import(/*webpackChunkName: "Edit"*/ "../views/EditProject.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
