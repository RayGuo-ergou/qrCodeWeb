<template>
  <div id="loadingBackground" v-show="loading"></div>
  <div id="spinner" v-show="loading">
    <button class="btn btn-primary" type="button" disabled>
      <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
      Generating...
    </button>
  </div>
  <div class="container">
    <h2>Generate QR codes</h2>
    <div class="row">
      <div class="col">
        <label for="number">
          How many QR code you want to generate?
          <input
            type="number"
            class="form-control"
            id="number"
            @input="checkValue"
            v-model="number"
            required
          />
          <div class="invalid-feedback">Please provide a valid zip.</div>
        </label>
      </div>
    </div>
    <div class="row" style="margin: 10px">
      <div class="col">
        <select v-model="selection" class="form-select" aria-label="Default select example">
          <option selected disabled>What is this QR code for? Default free.</option>
          <option value="0">Free</option>
          <option value="1">Cut in</option>
          <option value="2">Cut in and free.</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col" id="submitBtn">
        <button class="btn btn-primary" @click="generate">Generate</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import QRCodeServices from '@/services/QRCodeServices';

const number = ref(0);
const loading = ref(false);
const selection = ref(0);

const checkValue = () => {
  if (number.value > 100) {
    number.value = 100;
  }
  if (number.value < 0) {
    number.value = 0;
  }
};

const generate = async () => {
  loading.value = true;
  const email = localStorage.getItem('email');
  await QRCodeServices.generate({
    body: {
      // '' will return error tho
      email: email !== null ? email : '',
      type: selection.value,
    },
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  loading.value = false;
};
</script>
<style scoped lang="scss">
#submitBtn {
  margin: 15px;
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
  height: 100vh;
  width: 100vh;
  background-color: grey;
  z-index: 1;
  position: fixed;
  opacity: 0.5;
}
</style>
