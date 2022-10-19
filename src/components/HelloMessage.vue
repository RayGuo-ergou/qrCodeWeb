<template>
  <div class="hello">
    <h1>How to use this application:</h1>
    <p>There are 2 main purpose of this application:</p>
    <ul>
      <li>
        <router-link to="/scan"> Scan QR Code </router-link>
      </li>
      <li><router-link to="/generate"> Generate QR Code </router-link></li>
    </ul>

    <p>Both needs <b>authentication</b></p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps({
  msg: {
    type: String,
    default: 'Welcome to Your Vue.js + TypeScript App',
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
