<script setup lang="ts">
import { allowOnlyDecimal } from '@/utils';
import { Money as MoneyIcon } from '@element-plus/icons-vue';
import { computed, defineEmits, defineProps } from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const amount = computed({
  get() {
    return formatterAmount(props.modelValue);
  },
  set(val: string) {
    emit('update:modelValue', parserAmount(val));
  }
});

const formatterAmount = (value: string) => {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const parserAmount = (value: string) => {
  return value.replace(/\$\s?|(,*)/g, '');
};
</script>
<template>
  <el-input
    v-model="amount"
    autocomplete="off"
    maxlength="20"
    @keydown="allowOnlyDecimal($event as KeyboardEvent)"
    :suffix-icon="MoneyIcon"
  >
    <template #prepend>$</template>
  </el-input>
</template>
