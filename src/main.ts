import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import '@/fontawesome';
import '@/nprogress';
import './assets/main.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
