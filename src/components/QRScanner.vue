<template>
  <div id="qr-code-full-region"></div>
</template>
<script lang="ts" setup>
import { defineProps, onMounted, defineEmits } from 'vue';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';

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
const emit = defineEmits(['success', 'error']);

// onSuccess method
const onSuccess = (decodedText: string, decodedResult: object) => {
  // emit event with decodedText
  emit('success', decodedText, decodedResult);
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
