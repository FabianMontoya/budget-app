<script setup lang="ts">
const props = defineProps({
  type: String,
  name: String,
  disabled: Boolean
});
</script>

<template>
  <button
    class="cursor-pointer rounded-md border-transparent"
    :disabled="props.disabled"
    :class="[props.disabled ? '.btn-disabled' : `btn-${props.type}`]"
  >
    <span class="m-3"> {{ props.name }} </span>
  </button>
</template>

<style scoped>
.btn-primary {
  @apply rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;
}
.btn-secondary {
  @apply rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75;
}
.btn-disabled {
  @apply rounded-lg bg-gray-700 px-4 py-2 font-semibold text-black shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75;
}
</style>
