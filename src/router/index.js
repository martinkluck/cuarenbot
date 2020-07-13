import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      guest: true
    }
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      guest: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      auth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
