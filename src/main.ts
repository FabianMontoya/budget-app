import { createPinia } from 'pinia';
import { createApp } from 'vue';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { Vue3Mq } from 'vue3-mq';

import '@/fontawesome';
import i18n from '@/i18n';
import '@/nprogress';
import './assets/main.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.use(i18n);
app.use(Vue3Mq, {
	preset: 'devices',
	breakpoints: {
		phone: '0px',
		tablet: '768px',
		desktop: '1025px'
	}
});

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

app.component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app');
