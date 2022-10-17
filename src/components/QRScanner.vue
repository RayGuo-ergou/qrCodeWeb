<template>
  <div id="qr-code-full-region"></div>
</template>
<script lang="ts" setup>
import { defineProps, onMounted, defineEmits } from 'vue';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import QRCodeServices from '@/services/QRCodeServices';
import { AxiosError } from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// two props qrbox and fps
// qrbox default is 250
// fps default is 10
const props = defineProps({
  qrbox: {
    type: Number,
    default: 250,
  },
  fps: {
    type: Number,
    default: 10,
  },
});

// emit is two events success and error
const emit = defineEmits(['success', 'error', 'httpError']);

// onSuccess method
const onSuccess = async (decodedText: string, decodedResult: object) => {
  await QRCodeServices.verify({ body: { token: decodedText } })
    .then((res) => {
      console.log(res);
      // emit event with decodedText
      const { data } = res;

      emit('success', data);
    })
    .catch(async (err: AxiosError) => {
      console.log(err);
      if (err.response?.status === 401 || err.response?.status === 406) {
        // this means the token is invalid
        // delate local storage username and email and redirect to login page
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        emit('httpError', 'Invalid token, please login again');
        // refresh the page
        router.push('/login');
      } else if (err.response?.status === 400 || err.response?.status === 404) {
        emit('httpError', 'Invalid QR code');
      } else if (err.response?.status === 500) {
        emit('httpError', 'Server error, please try again or contact admin.');
      } else {
        emit('httpError', 'Unknown error, please try again or contact admin.');
      }
    });
};

// onError method
const onError = (errorMessage: string) => {
  // emit event with errorMessage

  emit('error', errorMessage);
};
const config = {
  fps: props.fps,
  qrbox: props.qrbox,
  supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA, Html5QrcodeScanType.SCAN_TYPE_FILE],
};

// when component is mounted
onMounted(() => {
  // create a new scanner
  const html5QrcodeScanner = new Html5QrcodeScanner('qr-code-full-region', config, false);
  html5QrcodeScanner.render(onSuccess, onError);
});
</script>
<style lang="scss" scoped></style>
