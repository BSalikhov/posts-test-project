import Vue from "vue";
import VueRouter from "vue-router";
import App from "@/App.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: App,
    redirect: "/posts",
    children: [
      {
        path: "/posts",
        name: "posts",
        component: () =>
          import(/* webpackChunkName: "posts" */ "@/views/Posts.vue"),
      },
      {
        path: "/posts/:id",
        name: "postDetails",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/PostDetails.vue"),
      },
      {
        path: "/posts/:id/update",
        name: "update",
        component: () =>
          import(/* webpackChunkName: "update" */ "@/views/PostForm.vue"),
      },
      {
        path: "/posts/create",
        name: "create",
        component: () =>
          import(/* webpackChunkName: "create" */ "@/views/PostForm.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
