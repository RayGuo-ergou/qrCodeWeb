import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/generate',
    name: 'generate',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/GenerateView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/scan',
    name: 'scan',
    component: () => import(/* webpackChunkName: "scan" */ '../views/ScanView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // check if the route requires auth
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // check if not logged in
    if (!localStorage.getItem('username')) {
      // go to login
      next({
        path: '/',
      });
    } else {
      next();
    }
    // if logged in hit login page, redirect to home
  } else if (to.name === 'login' && localStorage.getItem('username')) {
    next({
      path: '/',
    });
  } else {
    next();
  }
});

export default router;
