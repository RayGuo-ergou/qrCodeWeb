import { createApp, App as Application } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app: Application = createApp(App);
app.use(router);
app.mount('#app');
