<script setup lang="ts">
import { onBeforeMount, onUnmounted, reactive, ref } from 'vue';

import { auth } from '@/supabase';

import { useUserStore } from '@/stores/user';

import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const isLoading = ref(false);
const formData = reactive({
  password: '',
  verifyPassword: ''
});

onBeforeMount(async () => {
  const userData = await auth.getUser();
  console.log({ userData });
  if (!userStore.isRecoveryPassword || !userData) {
    router.push({ name: 'login' });
  }
});

onUnmounted(async () => {
  userStore.isRecoveryPassword = false; // Reset the status for avoid come back after change the password
  auth.signOut();
});

//TODO: Add validations for the password
const updatePassword = async () => {
  const { error } = await auth.updateUser({ password: formData.password });
  if (!error) {
    alert('Contraseña actualizada exitosamente.');
    await auth.signOut();
    router.push({ name: 'login' });
  } else {
    alert('Lo sentimos, ocurrió un error y no se logró actualizar la contraseña.');
  }
};
</script>
<template>
  <section class="flex flex-1 justify-center" v-loading="isLoading">
    <el-form ref="formRef" label-position="top" :model="formData" :disabled="isLoading">
      <el-form-item prop="password">
        <el-input v-model="formData.password" type="password" placeholder="Nueva contraseña" autocomplete="off">
          <template v-slot:prefix>
            <font-awesome-icon icon="fa-solid fa-unlock" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="verifyPassword">
        <el-input
          v-model="formData.verifyPassword"
          type="password"
          placeholder="Verifica tu contraseña"
          show-password
          autocomplete="off"
        >
          <template v-slot:prefix>
            <font-awesome-icon icon="fa-solid fa-unlock" />
          </template>
        </el-input>
      </el-form-item>
      <p>
        <el-button type="primary" @click="updatePassword()" :loading="isLoading">Actualizar contraseña</el-button>
      </p>
    </el-form>
  </section>
</template>
