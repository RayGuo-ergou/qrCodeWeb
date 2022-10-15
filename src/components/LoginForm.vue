<template>
  <h1>Login in</h1>

  <label for="email">
    <input id="email" type="text" placeholder="Insert Email" v-model="email" />
  </label>
  <label for="password">
    <input id="password" type="password" placeholder="Insert Password" v-model="password" />
  </label>
  <button @click="login">Login</button>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue';
import { AxiosStatic } from 'axios';
import { UserLoginPayload, UserLoginResult } from '@/types/User';

const axios: AxiosStatic = inject('axios') as AxiosStatic;
const email = ref('');
const password = ref('');

const login = () => {};
</script>

<style lang="scss" scoped></style>
