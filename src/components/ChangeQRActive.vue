<template>
  <div id="loadingBackground" v-show="loading"></div>
  <div id="spinner" v-show="loading">
    <button class="btn btn-primary" type="button" disabled>
      <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
      Generating...
    </button>
  </div>
  <div class="card">
    <div class="card-header">Use this QR code.</div>
    <div class="card-body">
      <h5 class="card-title">{{ qr.message }}</h5>

      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#confirmModal">
        Confirm This QR Code.
      </button>
      <p class="card-text">If the QR code is confirmed, it cannot use again.</p>
      <p class="card-text">
        The type of this QR code is <span style="color: #20c997">{{ convertedType }}</span>
      </p>
      <button class="btn btn-secondary" id="back" @click="$emit('goBack')">Go back</button>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="confirmModal"
    tabindex="-1"
    aria-labelledby="confirmModalLabel"
    :aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="confirmModalLabel">Confirmation</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          Use the QR Code?<b style="color: #dc3545">It cannot be reused after you confirm.</b>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button @click="comfirmQR" type="button" class="btn btn-primary" data-bs-dismiss="modal">
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// eslint-disable-next-line
import { defineProps, ref, computed, defineEmits } from 'vue';
import { QRVerifyData } from '@/types/QRCode';
import QRCodeServices from '@/services/QRCodeServices';
import { useToast } from 'vue-toastification';
import typesConvert from '@/types/typesConvert';

const toast = useToast();
const loading = ref(false);

const props = defineProps({
  qr: {
    type: Object as () => QRVerifyData,
    required: true,
  },
});

const emit = defineEmits(['goBack']);

const comfirmQR = async () => {
  loading.value = true;
  await QRCodeServices.update({
    id: props.qr.number,
    body: { email: props.qr.email },
  })
    .then((response) => {
      const { data } = response;
      if (!data.stateNow) {
        // throw a success toast
        toast.success(data.message);
      } else {
        toast.error('Something went wrong, please contact admin.');
      }
    })
    .catch((error) => {
      toast.error(error.response.data.error.message);
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
      // emit goBack event
      emit('goBack');
    });
};

const convertedType = computed(() => typesConvert[props.qr.type as keyof typeof typesConvert]);
</script>
<style scoped lang="scss">
#back {
  margin-top: 10px;
}
#spinner {
  /* Loader Div Class */
  position: absolute;
  top: 40%;
  right: 0px;
  width: 100%;
  z-index: 10000000;
}
#loadingBackground {
  // height and width is the window size
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: grey;
  z-index: 1;
  opacity: 0.7;
}
</style>
