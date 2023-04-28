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

onBeforeMount(async () => {
  const userData = await auth.getUser();
  console.log({ userData });
  userInfo.value = userData;
  if (!userStore.isRecoveryPassword || !userData) {
    console.log('...');
    //router.push({ name: 'login' });
  }
});

onUnmounted(async () => {
  userStore.isRecoveryPassword = false; // Reset the status for avoid come back after change the password
  auth.signOut();
});

//TODO: Add validations for the password
const updatePassword = async () => {
  isLoading.value = true;
  const { error } = await auth.updateUser({ password: formData.password });
  if (!error) {
    alert('Contraseña actualizada exitosamente.');
    await auth.signOut();
    router.push({ name: 'login' });
  } else {
    alert('Lo sentimos, ocurrió un error y no se logró actualizar la contraseña.');
  }

  isLoading.value = false;
};
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
    <div>
      <button :disabled="isLoading" @click="updatePassword">Actualizar contraseña</button>
    </div>
  </section>
</template>
