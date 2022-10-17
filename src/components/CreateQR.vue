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
  <img :src="example" alt="" />
  <button @click="downloadZip">downloadzip</button>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import QRCodeServices from '@/services/QRCodeServices';
import JsZip from 'jszip';
import { saveAs } from 'file-saver';

const number = ref(0);
const loading = ref(false);
const selection = ref(0);
const zip = new JsZip();

const example = ref(
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAADECAYAAADApo5rAAAAAklEQVR4AewaftIAAAj0SURBVO3BQYolyZIAQdUg739lnWIWjq0cgveyun9jIvYHa63/97DWOh7WWsfDWut4WGsdD2ut42GtdTystY6HtdbxsNY6HtZax8Na63hYax0Pa63jYa11PKy1jh8+pPI3VXxCZaq4UZkqJpU3Km5UpopJ5RMVb6hMFZPKVDGp/E0Vn3hYax0Pa63jYa11/PBlFd+k8obKVHGjMlXcqLxRMal8ouKbVKaKG5VPVHyTyjc9rLWOh7XW8bDWOn74ZSpvVLyh8kbFJyomlRuVqeJGZVL5TRWTylTxm1TeqPhND2ut42GtdTystY4f/uNUpopJ5aZiUrmp+KaKSeWm4kZlUpkqJpWp4r/sYa11PKy1joe11vHDf0zFpDKp3FTcVEwqNypTxU3FpHJTcaMyVXxC5abif9nDWut4WGsdD2ut44dfVvFPqphUblTeqLipuFG5qbhRuamYVD5RMal8ouLf5GGtdTystY6Htdbxw5ep/JuoTBWTylQxqUwVk8pUMalMFTcVk8pUcVMxqUwVk8pUMal8k8q/2cNa63hYax0Pa63jhw9V/C9R+YTKVPGGylQxqUwVk8q/ScVNxf+Sh7XW8bDWOh7WWof9wQdUpopJ5Zsq3lCZKiaVm4pJ5Y2KSeWmYlKZKm5UpopJ5RMVk8pUMal8U8VvelhrHQ9rreNhrXXYH3xA5abiDZWp4ptUbireUPlExaQyVUwqNxWTylTxCZWp4kZlqphUbiomlanimx7WWsfDWut4WGsd9gdfpHJTcaNyUzGp3FTcqEwVb6hMFZPKVDGpTBW/SeUTFZPKTcWkMlVMKjcVk8pU8YmHtdbxsNY6HtZah/3BL1K5qfgmlaniDZWpYlKZKiaVqeITKlPFGypvVNyoTBU3KlPFv9nDWut4WGsdD2ut44cPqdxU3KhMFZPKVPEJlanimyomlaliUpkq3lD5JpWbihuVqWJSmSomlTcqvulhrXU8rLWOh7XWYX/wAZWp4kZlqphUpooblTcqJpWbihuVqeITKlPFN6lMFZ9Quam4UZkqblRuKj7xsNY6HtZax8Na67A/+AepTBWTyk3FGypTxW9SmSomlaniRuWNiknlpmJS+UTFGypvVHzTw1rreFhrHQ9rreOHD6l8ouKmYlJ5Q2WqmFRuKiaVqWJSmSpuKiaVNypuVKaKG5Wp4hMqb1S8oTJVfOJhrXU8rLWOh7XWYX/wRSpTxaRyUzGp3FRMKlPFpDJVfEJlqphUpopJZaq4Ubmp+JtUbireUPlExSce1lrHw1rreFhrHfYHH1C5qXhDZap4Q2WquFGZKm5Upoo3VKaKT6i8UfGGylTxhsobFZPKGxWfeFhrHQ9rreNhrXXYH/wilaniRuVvqnhDZaq4UZkqJpWpYlK5qfiEyjdVfEJlqvibHtZax8Na63hYax32B1+kMlVMKjcVn1D5RMWk8kbFjcpU8QmVqeJGZar4J6lMFZPKVPGbHtZax8Na63hYax0//DKVqWJSuVGZKiaVqeKbKm5UblTeUPlNFZPKN1W8UTGp3KhMFd/0sNY6HtZax8Na67A/+ItUpopPqNxUvKHyRsUbKlPFpDJVTCpTxW9SuamYVG4q3lCZKiaVqeITD2ut42GtdTystY4fPqQyVUwqNypTxaRyUzGp3KjcVLyhMlXcVEwqU8Wk8gmVNyqmihuVm4pJ5Y2KSWWq+KaHtdbxsNY6HtZah/3BX6QyVXxCZar4hMonKm5UpopJZaqYVG4qblSmihuVqeINlaniRuUTFZ94WGsdD2ut42GtddgffEDljYpJ5RMVk8pNxaTyRsWk8kbFGypTxY3KVHGjclPxhspUMancVNyo3FR84mGtdTystY6HtdZhf/CLVKaKG5Wp4g2VqeJG5Y2KG5WpYlK5qbhRuamYVKaKN1TeqHhD5abiRmWq+MTDWut4WGsdD2ut44cPqUwVNypvqHxCZap4o2JSuamYVKaKG5WpYqqYVN5QmSreqLhReaPiRuWm4pse1lrHw1rreFhrHT/8sopJZar4JpWp4o2KSWWquFGZKm5UpooblanipuJGZaq4UbmpeEPlpuJGZar4xMNa63hYax0Pa63D/uCLVKaKSeWbKiaVqeINlaniRuWNin+SylQxqdxU3KjcVLyhclPxTQ9rreNhrXU8rLWOHz6kMlW8UfGGyhsqb1RMKm9UvKEyVbyhMlVMKlPFTcWNylQxVdyovFExqUwqU8UnHtZax8Na63hYax0//DKVqWJS+YTKVHGjMlVMKjcVk8qNyk3FJyomlaliUvkmlZuKm4pJZVL5mx7WWsfDWut4WGsdP/zDKj6hMqlMFTcqNxWTylQxqUwVk8qk8kbFpDJVTCpTxd+kMlVMKjcVf9PDWut4WGsdD2ut44dfVnGj8kbFTcWk8gmVNyreqPhExU3FpDJV3Kh8k8pNxaRyU/FND2ut42GtdTystY4fPlTxiYpvUpkqJpXfpHJTcaMyVUwqb1R8omJSual4Q+WmYlKZVKaKTzystY6HtdbxsNY67A8+oPI3Vdyo/JtU3KjcVEwqU8Wk8omKSWWqmFSmikllqphUbir+poe11vGw1joe1lrHD19W8U0qNyo3FTcqU8WNylQxqUwqNxWTyqQyVUwqNxVvqEwVn6j4hMobFZ94WGsdD2ut42Gtdfzwy1TeqPhExaTyhspNxU3FGyo3FZPKTcWk8kbFpPKGyicq/kkPa63jYa11PKy1jh/+4yr+SSqfUPlExScqJpWpYlKZKj6h8kbFJx7WWsfDWut4WGsdP/zHqNxUTCpTxaTyiYoblTcqJpVJZaqYVG4qJpWp4qZiUvlNFd/0sNY6HtZax8Na6/jhl1X8popJ5UZlqvhExY3KVDFVTCpTxRsV31QxqbxR8U0qv+lhrXU8rLWOh7XW8cOXqfxNKm9UTCpTxVRxozJVvKEyVXxC5RMqNxU3KpPKGxU3Fb/pYa11PKy1joe11mF/sNb6fw9rreNhrXU8rLWOh7XW8bDWOh7WWsfDWut4WGsdD2ut42GtdTystY6HtdbxsNY6HtZax8Na6/g/0u3hi3CHABkAAAAASUVORK5CYII=',
);

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

const downloadZip = async () => {
  const data = example.value.split(',')[1];

  await zip.file('test.jpg', data, { base64: true });

  await zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, 'example.zip');
  });
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
