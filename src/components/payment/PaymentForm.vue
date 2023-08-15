<script setup lang="ts">
import { Check as CheckIcon, Close as CloseIcon, Link as LinkIcon } from '@element-plus/icons-vue';
import { ElDrawer, type FormInstance } from 'element-plus';
import { computed, reactive, ref, watch } from 'vue';

import CurrencyInput from '@/components/ui/CurrencyInput/index.vue';
import { useMQ } from '@/composable/useMq';
import { usePaymentStore } from '@/stores/payment';
import type { IPaymentForm } from '@/stores/types/payments';
import { showMessage } from '@/utils';

const paymentStore = usePaymentStore();

interface IProps {
	modelValue: boolean;
	initialValues: IPaymentForm;
}

const props = defineProps<IProps>();
const emit = defineEmits(['update:modelValue']);
const { isPhone } = useMQ();

const form = reactive<IPaymentForm>(props.initialValues);
const drawerRef = ref<InstanceType<typeof ElDrawer>>();
const formRef = ref<FormInstance>();
const isLoading = ref(false);
const drawerTitle = computed(() => (form.id ? 'Edit payment' : 'Create payment'));
const dialog = computed({
	get() {
		return props.modelValue;
	},
	set(newValue) {
		emit('update:modelValue', newValue);
	}
});

const amount = computed({
	get() {
		return form.amount.toString();
	},
	set(val: string) {
		form.amount = Number(val);
	}
});

watch(
	() => props.initialValues,
	(newValue) => {
		Object.assign(form, newValue);
	}
);

// TODO: create the validation rules for the form: https://element-plus.org/en-US/component/form.html#validation
const onSave = async () => {
	isLoading.value = true;
	let successMessage = 'Payment created successful!';
	if (form.id) {
		successMessage = 'Payment updated successful!';
		await paymentStore.updatePayment(form);
	} else {
		await paymentStore.savePayment(form);
	}
	await paymentStore.loadPayments();

	showMessage(successMessage, 'success');

	isLoading.value = false;
	drawerRef.value!.close();
};

const handleClose = (done: () => void) => {
	if (isLoading.value) {
		return;
	}
	if (formRef.value) {
		formRef.value.resetFields();
	}

	done();
};

const cancelForm = () => {
	drawerRef.value!.close();
};
</script>

<template>
	<el-drawer
		ref="drawerRef"
		v-model="dialog"
		:size="isPhone ? '85%' : '40%'"
		:title="drawerTitle"
		:before-close="handleClose"
		direction="ltr"
		lock-scroll
	>
		<div>
			<el-form ref="formRef" :model="form" label-width="80px" :disabled="isLoading" class="-mt-5">
				<el-form-item v-if="form.id != 0" label="ID:">
					<span class="el-form-item__label">{{ form.id }}</span>
				</el-form-item>
				<el-form-item label="Description:">
					<el-input v-model="form.description" autocomplete="off" maxlength="50" />
				</el-form-item>
				<el-form-item label="Amount:">
					<CurrencyInput v-model="amount" />
				</el-form-item>
				<el-form-item label="Url:">
					<div class="flex w-full flex-row items-center gap-2">
						<el-tooltip content="Link for online payment" placement="top">
							<el-icon class="cursor-help text-gray-400"><InfoFilled /></el-icon>
						</el-tooltip>
						<el-input type="url" v-model="form.url" :prefix-icon="LinkIcon" maxlength="500" />
					</div>
				</el-form-item>
				<el-form-item label="Reference:">
					<div class="flex w-full flex-row items-center gap-2">
						<el-tooltip content="Reference used for the payment" placement="top">
							<el-icon class="cursor-help text-gray-400"><InfoFilled /></el-icon>
						</el-tooltip>
						<el-input v-model="form.reference" maxlength="50" />
					</div>
				</el-form-item>
				<el-form-item label="Is fixed:">
					<div class="flex w-full flex-row items-center gap-2">
						<el-switch v-model="form.isFixed" inline-prompt :active-icon="CheckIcon" :inactive-icon="CloseIcon" />
						<el-tooltip content="Is a recurring payment" placement="top">
							<el-icon class="cursor-help text-gray-400"><InfoFilled /></el-icon>
						</el-tooltip>
					</div>
				</el-form-item>
			</el-form>
			<div>
				<el-button @click="cancelForm" :disabled="isLoading">Cancel</el-button>
				<el-button type="primary" :loading="isLoading" @click="onSave">Submit</el-button>
			</div>
		</div>
	</el-drawer>
</template>
