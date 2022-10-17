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
      <div class="col-12">
        <label for="number" style="width: 100%">
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

    <div class="row" style="margin-top: 5px">
      <div class="col-12">
        <label for="select" style="width: 100%">
          What kind of QR code you want to generate?
          <select
            id="select"
            style="width: 100%"
            v-model="selection"
            class="form-select"
            aria-label="Default select example"
          >
            <option selected disabled>What is this QR code for? Default free.</option>
            <option value="0">Free</option>
            <option value="1">Cut in</option>
            <option value="2">Cut in and free.</option>
          </select>
        </label>
      </div>
    </div>
    <div class="row">
      <div class="col" id="submitBtn">
        <button class="btn btn-outline-primary" @click="generate" style="width: 200px">
          Generate
        </button>
      </div>
    </div>
    <button
      class="btn btn-outline-primary"
      @click="downloadZip"
      style="margin-bottom: 5px; width: 200px"
    >
      Download all QR codes
    </button>
    <div class="row row-cols-1 row-cols-md-3 row-cols-sm-2 g-4" style="margin-right: 5px">
      <QRCodeBox class="col" v-for="qr in QRList" :key="qr.username + qr.number" :qr="qr" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, Ref } from 'vue';
import QRCodeServices from '@/services/QRCodeServices';
import UserService from '@/services/UserService';
import JsZip from 'jszip';
import { saveAs } from 'file-saver';
import { QRGenerateData } from '@/types/QRCode';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import Bottleneck from 'bottleneck';
import QRCodeBox from '@/components/QRCodeBox.vue';

const number = ref(0);
const loading = ref(false);
const selection = ref(0);
const zip = new JsZip();
const QRList: Ref<QRGenerateData[]> = ref([]);
const router = useRouter();
const toast = useToast();
const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 500,
});

const checkValue = () => {
  if (number.value > 100) {
    number.value = 100;
  }
  if (number.value < 0) {
    number.value = 0;
  }
};

const generate = async () => {
  // TODO: should move to router beforeeach
  // will do if have time

  // EDIT: still leave this for now
  // in case user keep the page open for a long time
  await UserService.getUser()
    .then((response) => {
      console.log(response);
      console.log('logged in');
    })
    .catch((error) => {
      console.log(error);
      console.log('not logged in');
      number.value = 0;
      // this means the token is invalid
      // delate local storage username and email and redirect to login page
      localStorage.removeItem('username');
      localStorage.removeItem('email');

      // give a toast
      toast.error('Invalid token, please login again', {
        timeout: 3000,
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
      router.push('/login');
    });
  // if number is 0 do nothing
  if (number.value !== 0 && number.value != null && typeof number.value === 'number') {
    loading.value = true;
    document.documentElement.style.overflow = 'hidden';
    const email = localStorage.getItem('email');

    const dummyArray = Array.from({ length: number.value }, (_, i) => i);

    dummyArray.forEach(async (i) => {
      await limiter.schedule(async () => {
        await QRCodeServices.generate({
          body: {
            // '' will return error tho
            email: email !== null ? email : '',
            type: selection.value,
          },
        })
          .then((response) => {
            // push data to list
            const { data } = response;
            QRList.value.push(data);

            // console.log(response);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            // if i is final number, set loading to false
            if (i === number.value - 1) {
              loading.value = false;
              document.documentElement.style.overflow = 'visible';
            }
          });
      });
    });

    // TODO: KEEP THE CODE BELOW
    // incase anything wrong happens
    // for loop to get number of qr code
    // for (let i = 0; i < number.value; i += 1) {
    //   QRCodeServices.generate({
    //     body: {
    //       // '' will return error tho
    //       email: email !== null ? email : '',
    //       type: selection.value,
    //     },
    //   })
    //     .then((response) => {
    //       // push data to list
    //       const { data } = response;
    //       QRList.value.push(data);

    //       // console.log(response);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    //     .finally(() => {
    //       // if i is final number, set loading to false
    //       if (i === number.value - 1) {
    //         loading.value = false;
    //       }
    //     });
    // }
  }
  console.log(QRList.value);
};

const downloadZip = async () => {
  QRList.value.forEach((element) => {
    zip.file(`${element.username}${element.number}.jpg`, element.dataImage.split(',')[1], {
      base64: true,
    });
  });

  await zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, 'QRCode.zip');
  });
};
</script>
<style scoped lang="scss">
#submitBtn {
  margin: 5px 0;
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
  height: 100%;
  width: 100%;
  background-color: grey;
  z-index: 1;
  position: fixed;
  opacity: 0.5;
}
</style>
