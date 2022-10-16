<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li v-for="nav in navData" :key="nav.name" class="nav-item">
            <router-link class="nav-link" :to="nav.link">{{ nav.name }}</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <router-link
            class="btn btn-primary"
            style="color: #fff; margin-right: 10px; font-weight: unset"
            id="login"
            to="/login"
            v-if="!isLoggedIn"
            >Login</router-link
          >
          <div class="dropdown" v-else>
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style="margin-right: 10px"
            >
              {{ username }}: {{ email }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><button class="dropdown-item" @click="logout">Logout</button></li>
            </ul>
          </div>
          <button @click="checkUser">check user</button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import UserService from '@/services/UserService';

const route = useRoute();
const isLoggedIn = ref(localStorage.getItem('username') !== null);
const username = ref(
  localStorage.getItem('username') !== null ? localStorage.getItem('username') : '',
);
const email = ref(localStorage.getItem('email') !== null ? localStorage.getItem('email') : '');

// watch when route change
// disable eslint because we don't use this variable
watch(
  () => route.path,
  () => {
    isLoggedIn.value = localStorage.getItem('username') !== null;
    username.value =
      localStorage.getItem('username') !== null ? localStorage.getItem('username') : '';
    email.value = localStorage.getItem('email') !== null ? localStorage.getItem('email') : '';
  },
);

const navData = ref([
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'About',
    link: '/about',
  },
  {
    name: 'Scan',
    link: '/scan',
  },
]);

// logout onclick function
const logout = () => {
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  isLoggedIn.value = false;
  username.value = '';
  email.value = '';
  UserService.logout()
    .then((response) => {
      console.log(response.message);
    })
    .catch((error) => {
      console.log(error);
    });
};

const checkUser = () => {
  UserService.getUser()
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
<style lang="scss" scoped>
nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
