<script setup lang="ts">
import { onBeforeMount, onUnmounted, reactive, ref } from 'vue';

import { useUserStore } from '@/stores/user';
import { auth } from '@/supabase';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const isLoading = ref(false);
const userInfo = ref({});
const formData = reactive({
  password: '',
  verifyPassword: ''
});

const validateSessionAndClose = async () => {
  const { data } = await auth.getSession();
  console.log({ data });
  if (data.session !== null) {
    await auth.signOut();
  }
};

const goToLogin = async () => {
  isLoading.value = true;
  await validateSessionAndClose();
  router.push({ name: 'login' });
  isLoading.value = false;
};

//TODO: Add validations for the password
const updatePassword = async () => {
  isLoading.value = true;
  const { error } = await auth.updateUser({ password: formData.password });
  if (!error) {
    alert('Contraseña actualizada exitosamente.');
    await goToLogin();
  } else {
    alert('Lo sentimos, ocurrió un error y no se logró actualizar la contraseña.');
  }
  isLoading.value = false;
};

onBeforeMount(async () => {
  isLoading.value = true;
  const userData = await auth.getUser();
  userInfo.value = userData;
  if (!userStore.isRecoveryPassword || userData.error) {
    await goToLogin();
  }
  isLoading.value = false;
});

onUnmounted(() => {
  userStore.isRecoveryPassword = false; // Reset the status for avoid come back after change the password
  validateSessionAndClose();
});
</script>
<template>
  <section class="flex flex-1 flex-col justify-center gap-5">
    <p>Ingresa la nueva contraseña para tu cuenta</p>
    <form :disabled="isLoading" class="flex gap-4">
      <input v-model="formData.password" type="password" placeholder="Nueva contraseña" autocomplete="off" />
      <input
        v-model="formData.verifyPassword"
        type="password"
        placeholder="Verifica tu contraseña"
        autocomplete="off"
      />
    </form>
    <div class="flex gap-2">
      <button :disabled="isLoading" @click="updatePassword">Actualizar contraseña</button>
      <button :disabled="isLoading" @click="goToLogin">Cancelar</button>
    </div>
    <div v-if="isLoading">
      <p>Procesando solicitud, por favor espere...</p>
    </div>
  </section>
</template>
