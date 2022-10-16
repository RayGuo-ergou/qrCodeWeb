<template>
  <div class="container">
    <h1>Login in</h1>

    <form @submit.prevent="submit">
      <div class="form-group row">
        <label for="email" class="col6">
          Email address
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter email"
            v-model="email"
          />
        </label>
      </div>
      <div class="form-group row">
        <label for="password" class="col6">
          Password
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            v-model="password"
          />
        </label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import UserService from '@/services/UserService';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();

const email = ref('');
const password = ref('');

const submit = async () => {
  // send login request to server
  await UserService.login({
    email: email.value,
    password: password.value,
  })
    .then((response) => {
      const { data } = response;
      // store username and email into local storage
      localStorage.setItem('username', data.username);
      localStorage.setItem('email', data.email);

      toast.success('Login success, redirect to home page.', {
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: 'button',
        icon: true,
        rtl: false,
      });
      // vue router redirect to home page
      router.push('/');
    })
    .catch((error) => {
      // if error.data.error.message is undefined, show error.data.error
      // else show "Server error, something went wrong"
      console.log(error);
      let message = 'Server error, something went wrong';
      if (error.response?.data?.error.message != null) {
        message = error.response?.data?.error.message;
      }
      toast.error(message, {
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: 'button',
        icon: true,
        rtl: false,
      });
    });
};
</script>

<style lang="scss" scoped>
label {
  margin-bottom: 10px;
}
</style>
