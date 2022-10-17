<template>
  <div class="container">
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
        <ChangeQRActive :qr="qrData" v-else @goBack="successScan = !successScan" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import QRScanner from '@/components/QRScanner.vue';
import ChangeQRActive from '@/components/ChangeQRActive.vue';
import { useToast } from 'vue-toastification';
import { ref, Ref } from 'vue';
import { QRVerifyData } from '@/types/QRCode';

const initQRData: QRVerifyData = {
  message: 'inint',
  user: 'init',
  number: -1,
  isActive: false,
  type: -1,
  email: 'init',
};

const qrData: Ref<QRVerifyData> = ref(initQRData);

const successScan = ref(false);

const toast = useToast();

const onSuccess = (data: QRVerifyData) => {
  if (!data.isActive) {
    toast.error('This QR code is already been used.');
  } else {
    qrData.value = data;
    successScan.value = true;
  }
  console.log(data);
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
// when desktop mode margin top 10%
@media screen and (min-width: 768px) {
  .container {
    margin-top: 10%;
  }
}
// when mobile mode margin top 20%
@media screen and (max-width: 768px) {
  .container {
    margin-top: 30%;
  }
}
</style>
