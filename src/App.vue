<script setup lang="ts">
import '@/router/guards';
import { onBeforeUnmount, onMounted, reactive } from 'vue';
import { RouterView } from 'vue-router';
import OfflineView from './views/OfflineView.vue';

const app = reactive({
  isOnline: true
});

const setIsOnline = () => (app.isOnline = true);
const setIsOffLine = () => (app.isOnline = false);

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
  <OfflineView v-if="!app.isOnline" />
  <RouterView v-else />
</template>
