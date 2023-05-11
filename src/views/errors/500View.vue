<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const handleBack = () => router.back();
</script>
<template>
  <article class="flex w-full flex-col items-center justify-center gap-5 md:m-5">
    <h1>Internal server error - 500</h1>
    <el-button type="primary" plain @click="handleBack">Go home</el-button>
  </article>
</template>
