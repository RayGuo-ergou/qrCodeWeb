<template>
  <QRScanner :qrbox="250" :fps="10" @success="onSuccess" @error="onError" />
</template>
<script setup lang="ts">
import QRScanner from '@/components/QRScanner.vue';

const onSuccess = (decodeText: string, decodedResult: object) => {
  console.log(`Scan result: ${decodeText}`, decodedResult);
};

const onError = (errorMessage: string) => {
  console.log(`Scan error: ${errorMessage}`);
};
</script>
<style lang="scss" scoped></style>
