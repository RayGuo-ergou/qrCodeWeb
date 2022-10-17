<template>
  <div class="row justify-content-xl-center">
    <div class="col-xl-6 col-xs-10">
      <QRScanner
        v-if="!successScan"
        :qrbox="250"
        :fps="10"
        @success="onSuccess"
        @error="onError"
        @httpError="onHttpError"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import QRScanner from '@/components/QRScanner.vue';
import { useToast } from 'vue-toastification';
import { ref } from 'vue';

const successScan = ref(false);

const toast = useToast();

const onSuccess = (decodeText: string, decodedResult: object) => {
  console.log(`Scan result: ${decodeText}`, decodedResult);
};

const onError = (errorMessage: string) => {
  console.log(errorMessage);
  toast.error(errorMessage, {
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
};

const onHttpError = (errorMessage: string) => {
  console.log(errorMessage);
  toast.error(errorMessage, {
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
};
</script>
<style lang="scss" scoped>
// place the scanner in the center
#qr-code-full-region {
  margin: auto;
}
</style>
