<template>
  <div class="hello">
    <h1>How to use this application:</h1>
    <p>There are 2 main purpose of this application:</p>
    <ul>
      <li>Scan QR Code</li>
      <li>Generate QR Code</li>
    </ul>

    <p>Both needs <b>authentication</b></p>

    <h2>Scan QR Code</h2>
    <ol>
      <li>Click login button at top right and login.</li>
      <br />
      <li></li>
    </ol>
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
