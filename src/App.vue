<script setup lang="ts">
import '@/router/guards';
import { onBeforeMount, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { RouterView } from 'vue-router';

import apex_EN from 'apexcharts/dist/locales/en.json';
import apex_ES from 'apexcharts/dist/locales/es.json';
import element_ES from 'element-plus/dist/locale/es.mjs';

import OfflineView from './views/OfflineView.vue';

// TODO: Create feature to change the language around the app depend i18n

const elLocale = ref(element_ES);

const app = reactive({
	isOnline: true
});

const setIsOnline = () => (app.isOnline = true);
const setIsOffLine = () => (app.isOnline = false);

onBeforeMount(() => {
	// ? Global definitions for apexcharts
	window.Apex = {
		chart: {
			defaultLocale: 'es',
			locales: [apex_EN, apex_ES],
			background: 'transparent',
			toolbar: {
				tools: {
					download: false
				}
			}
		},
		tooltip: {
			theme: 'light'
		},
		theme: {
			mode: 'light',
			palette: 'palette1'
		}
	};
});

onMounted(() => {
	window.addEventListener('online', setIsOnline);
	window.addEventListener('offline', setIsOffLine);
});

onBeforeUnmount(() => {
	window.removeEventListener('online', setIsOnline);
	window.removeEventListener('offline', setIsOffLine);
});
</script>

<template>
	<el-config-provider :locale="elLocale">
		<OfflineView v-if="!app.isOnline" />
		<RouterView v-else />
	</el-config-provider>
</template>
