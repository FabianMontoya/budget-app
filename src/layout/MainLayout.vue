<script setup lang="ts">
import router from '@/router';
import { useUserStore } from '@/stores/user';
import { auth } from '@/supabase';
import { ElMenu } from 'element-plus';
import { ref } from 'vue';
import { RouterView } from 'vue-router';

const userStore = useUserStore();

const isLoading = ref(false);
const activeIndex = ref('dashboard');
const handleSelect = (key: string) => {
  if (key === 'dashboard') {
    router.push('/app/dashboard');
  }
};

const logOut = async () => {
  isLoading.value = true;
  await auth.signOut();
  await router.push('/');
  isLoading.value = false;
};
</script>

<template>
  <main class="min-h-screen bg-gray-100 bg-opacity-10" v-loading="isLoading">
    <el-menu
      :default-active="activeIndex"
      class="mb-4"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
      v-if="userStore.userData"
    >
      <el-menu-item index="dashboard"
        ><el-icon><Grid /></el-icon>Dashboard</el-menu-item
      >
      <div class="flex-grow" />
      <el-sub-menu index="account">
        <template #title
          ><el-icon><User /></el-icon>Cuenta</template
        >
        <el-menu-item index="account-logout" @click="logOut">Cerrar sesión</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <div :class="[userStore.userData ? 'px-4' : '']">
      <RouterView />
    </div>
  </main>
</template>
