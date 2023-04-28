<script setup lang="ts">
import { onBeforeMount } from 'vue';

import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

const getHashParams = () => {
  const params = window.location.hash.substring(1).split('&');
  var result: any = {};

  params.forEach((item) => {
    const param = item.split('=');
    result[param[0]] = decodeURIComponent(param[1]);
  });

  return result;
};

const verifyStatus = () => {
  const params = getHashParams();
  console.log('onBeforeMount: ', { params });

  if (params.type === 'recovery') {
    userStore.isRecoveryPassword = true;
    router.push({ name: 'restorePassword' });
    return;
  }

  if (params.type === 'magiclink') {
    router.push({ name: 'dashboard' });
    return;
  }

  if (params.error_code === '401') {
    alert('El link ingresado no es valido o ha expirado, por favor ejecute la acción requerida nuevamente.');
  }

  router.push('/');
  return;
};

onBeforeMount(() => {
  verifyStatus();
});
</script>
<template></template>
