import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useToast, POSITION } from 'vue-toastification';
import UserService from '@/services/UserService';

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

router.beforeEach(async (to, from, next) => {
  // check if the route requires auth
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // check if not logged in

    try {
      await UserService.getUser();

      next();
    } catch (err) {
      console.log(err);
      toast.error('You must be logged in to access this page');
      // clear the username and email
      localStorage.removeItem('username');
      localStorage.removeItem('email');

      next({ path: '/login' });
    }

    // the worst case is user delete username and login again
    // its fine to use local storage
  } else if (to.name === 'login' && localStorage.getItem('username')) {
    next({
      path: '/',
    });
  } else {
    next();
  }
});

// after each route change, collapse the navbar
router.afterEach(() => {
  const navbar = document.getElementById('navbarSupportedContent');
  // if the navbar is open, close it
  if (navbar && navbar.classList.contains('show')) {
    navbar.classList.remove('show');
  }
});

export default router;
