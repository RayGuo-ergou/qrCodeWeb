<template>
  <div class="card">
    <h4 class="card-header">Error:</h4>
    <div class="card-body">
      <h5 class="card-title">Something went wrong.</h5>
      <p class="card-text">
        {{ errorMessage }}
      </p>
      <button class="btn btn-primary" @click="router.go(0)">Go Back.</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
  errorMessage: {
    type: String,
    default: 'Unknown error',
  },
});
</script>

<style scoped>
h4,
p {
  color: #dc3545;
}
</style>
