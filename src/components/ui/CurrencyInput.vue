<script setup lang="ts">
import { allowOnlyDecimal } from '@/utils';
import { Money as MoneyIcon } from '@element-plus/icons-vue';
import { computed } from 'vue';

const props = defineProps<{
	// Input value
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
		type="tel"
		autocomplete="off"
		maxlength="20"
		:suffix-icon="MoneyIcon"
		@keydown="allowOnlyDecimal($event as KeyboardEvent)"
	>
		<template #prepend>$</template>
	</el-input>
</template>
