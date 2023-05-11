<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue';
</script>
<template>
  <div class="absolute z-0 h-screen w-screen bg-transparent bg-[url('@/assets/landing-page.png')]" />
  <article class="relative z-10 flex h-screen w-screen items-center justify-center">
    <div class="w-full max-w-md rounded-md bg-white bg-opacity-90 p-10">
      <h1 class="font-bold text-blue-400">Inicia sesión</h1>
      <LoginForm />
    </div>
  </article>
</template>
