<script setup lang="ts">
import { ref } from 'vue';

import router from '@/router';
import { auth } from '@/supabase';

const isLoading = ref(false);

const logOut = async () => {
  isLoading.value = true;
  await auth.signOut();
  await router.push('/');
  router.go(0); // Reload the app
};
</script>
<template>
  <article>
    <h1>This is the dashboard view</h1>
    <div class="mt-5">
      <button @click="logOut" :disabled="isLoading">Cerrar sesión</button>
    </div>
    <div v-if="isLoading">
      <p>Procesando solicitud, por favor espere...</p>
    </div>
  </article>
</template>
