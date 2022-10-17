import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useToast, POSITION } from 'vue-toastification';

const toast = useToast();

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
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
      // give a toast
      toast.error('You must be logged in to access this page', {
        position: POSITION.TOP_RIGHT,
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true,
        rtl: false,
      });
      // go to login
      next({
        path: '/',
      });
    } else {
      next();
    }
    // if logged in hit login page, redirect to home
    // TODO: should send an ajax request to check if the token is valid
  } else if (to.name === 'login' && localStorage.getItem('username')) {
    next({
      path: '/',
    });
  } else {
    next();
  }
});

export default router;
