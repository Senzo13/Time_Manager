import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import WorkingTimes from "../views/WorkingTimes.vue";
import WorkingTime from "../views/WorkingTime.vue";
import Teams from "../views/TeamsView.vue";
import Team from "../views/TeamView.vue";
import store from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // Home
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    // Login
    {
      path: "/signin",
      name: "signin",
      component: () => import("../views/SigninView.vue"),
    },

    // Register
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignupView.vue"),
    },

    // Working Times
    {
      path: "/workingtimes",
      name: "workingtimes",
      component: WorkingTimes,
      props: true,
    },

    // Working Time
    {
      path: "/workingtime/:id",
      name: "workingtime",
      component: WorkingTime,
    },

    // Account
    {
      path: "/account",
      name: "account",
      component: () => import("../views/AccountView.vue"),
    },

    // Users
    {
      path: "/users",
      name: "users",
      component: () => import("../views/UsersView.vue"),
    },

    // 404
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
    },

    // Team
    {
      path: "/teams",
      name: "teams",
      component: Teams,
    },
    {
      path: "/team/:id",
      name: "team",
      component: Team,
    }
  ],
});

// Check if user is logged in
router.beforeEach((to, from, next) => {
  const publicPages = ["/signin", "/signup"];
  const privatePages = !publicPages.includes(to.path);
  const logged = store.getters.isLogged;

  if (privatePages && !logged) {
    return next("/signin");
  }
  next();
});

export default router;
