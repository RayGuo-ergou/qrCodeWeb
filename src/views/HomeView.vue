<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/plusBlack.jpg" />
    <HelloMessage msg="hello world" />
  </div>
</template>

<script setup lang="ts">
import HelloMessage from '@/components/HelloMessage.vue'; // @ is an alias to /src
</script>

<style scoped>
img {
  height: 40vmin;
  pointer-events: none;
}
</style>
