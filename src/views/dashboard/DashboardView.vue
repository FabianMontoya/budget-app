<script setup lang="ts">
import PaymentForm from '@/components/payment/PaymentForm.vue';
import { usePaymentStore } from '@/stores/payment';
import type { IPaymentData, IPaymentForm } from '@/stores/types/payments';
import { ElLoading, ElTable } from 'element-plus';
import { computed, onMounted, ref } from 'vue';

const paymentStore = usePaymentStore();

const isLoading = ref(true);
const dialog = ref(false);
const search = ref('');

const filterTableData = computed(() =>
	paymentStore.payments.filter(
		(data) => !search.value || data.description.toLowerCase().includes(search.value.toLowerCase())
	)
);

const emptyValues: IPaymentForm = {
	id: 0,
	description: '',
	amount: 0,
	isFixed: false,
	url: '',
	reference: ''
};
let initialValues = { ...emptyValues };

const handleEdit = (_index: number, row: IPaymentData) => {
	initialValues = { ...row };
	dialog.value = true;
};

const handleDelete = async (_index: number, row: IPaymentData) => {
	const loader = ElLoading.service({ lock: true });
	await paymentStore.deletePayment(row.id);
	await paymentStore.loadPayments();
	loader.close();
};

const handleOpen = () => {
	initialValues = { ...emptyValues };
	dialog.value = true;
};

onMounted(async () => {
	await paymentStore.loadPayments();
	isLoading.value = false;
});
</script>
<template>
	<article v-loading="isLoading">
		<h1 class="py-4">Tabla de pagos fijos</h1>
		<el-table :data="filterTableData" border style="width: 700px">
			<el-table-column prop="description" label="Description" width="180" />
			<el-table-column prop="amount" label="Amount" width="180" />
			<el-table-column align="right">
				<template #header>
					<el-input v-model="search" size="small" placeholder="Type to search" />
				</template>
				<template #default="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
					<el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.$index, scope.row)">
						<template #reference>
							<el-button size="small" type="danger">Delete</el-button>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
		<h1 class="py-4">Tabla de fecha de pagos</h1>
		<el-table :data="paymentStore.payments" border style="width: 1000px">
			<el-table-column prop="description" label="Description" width="180" />
			<el-table-column prop="amount" label="Amount" width="180" />
			<el-table-column prop="created_at" label="Date">
				<template #default="scope">
					<span>{{ scope.row.created_at.format('ddd DD MMM, YYYY hh:mm a') }}</span>
				</template>
			</el-table-column>
		</el-table>
		<div id="actions" class="py-4">
			<el-button type="primary" @click="handleOpen">Agregar pago fijo</el-button>
			<el-button type="primary" @click="dialog = true">Agregar pago</el-button>
		</div>
	</article>
	<PaymentForm v-model="dialog" :initialValues="initialValues" />
</template>
