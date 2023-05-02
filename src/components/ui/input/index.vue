<script setup lang="ts">
const props = defineProps({
  type: String,
  placeholder: String,
  modelValue: String
});
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <input
    class="h-8 rounded-sm border-blue-100 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 focus-visible:shadow-md focus-visible:outline-none"
    required
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
