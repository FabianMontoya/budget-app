<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import LoginForm from '@/components/auth/LoginForm.vue';

const { t } = useI18n();
</script>
<template>
  <div class="absolute z-0 h-screen w-screen bg-transparent bg-[url('@/assets/landing-page.png')]" />
  <article class="relative z-10 flex h-screen w-screen md:w-auto md:items-center md:justify-center">
    <div class="w-full rounded-md bg-white bg-opacity-90 p-10 md:max-w-md">
      <h1 class="font-bold text-blue-400">{{ t('login.loginTitle') }}</h1>
      <LoginForm />
    </div>
  </article>
</template>
