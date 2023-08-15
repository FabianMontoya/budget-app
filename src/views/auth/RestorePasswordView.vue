<script setup lang="ts">
import { onBeforeMount, onUnmounted, reactive, ref } from 'vue';

import type { IUserData } from '@/stores/types/user';
import { useUserStore } from '@/stores/user';
import { auth } from '@/supabase';
import { showMessage } from '@/utils';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const isLoading = ref(false);
const userInfo = ref<IUserData>();
const formData = reactive({
	password: '',
	verifyPassword: ''
});

const validateSessionAndClose = async () => {
	const { data } = await auth.getSession();
	console.log({ data });
	if (data.session !== null) {
		await auth.signOut();
	}
};

const goToLogin = async () => {
	isLoading.value = true;
	await validateSessionAndClose();
	router.push({ name: 'login' });
	isLoading.value = false;
};

//TODO: Add validations for the password
const updatePassword = async () => {
	if (formData.password !== formData.verifyPassword) {
		showMessage('Las contraseñas no coinciden, favor validar.', 'error');
		return;
	}

	const regex =
		/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]\\|;:'",.<>/?-])[A-Za-z\d!@#$%^&*()_+={}[\]\\|;:'",.<>/?-]{12,}$/;
	if (!regex.test(formData.password)) {
		showMessage('La contraseña no cumple los requisitos mínimos de seguridad, favor validar.', 'error');
		return;
	}

	isLoading.value = true;
	const { error } = await auth.updateUser({ password: formData.password });
	if (!error) {
		showMessage('Contraseña actualizada exitosamente.', 'success');
		await goToLogin();
	} else {
		showMessage('Lo sentimos, ocurrió un error y no se logró actualizar la contraseña.', 'error');
	}
	isLoading.value = false;
};

onBeforeMount(async () => {
	isLoading.value = true;
	const userData = await auth.getUser();
	if (!userStore.isRecoveryPassword || userData.error) {
		await goToLogin();
	}
	userInfo.value = (userData.data.user as IUserData) ?? {};
	isLoading.value = false;
});

onUnmounted(() => {
	userStore.isRecoveryPassword = false; // Reset the status for avoid come back after change the password
	validateSessionAndClose();
});
</script>
<template>
	<section class="m-5 flex flex-1 flex-col justify-center gap-5 text-sm" v-loading="isLoading">
		<h2 class="text-2xl font-bold">Restaurar contraseña</h2>
		<p>
			Ingresa la nueva contraseña para tu cuenta
			<strong class="font-semibold">{{ userInfo?.email }}</strong>
		</p>
		<el-form :disabled="isLoading" class="flex max-w-md flex-col gap-2">
			<el-input
				v-model="formData.password"
				type="password"
				show-password
				placeholder="Nueva contraseña"
				autocomplete="off"
				maxlength="50"
			/>
			<el-input
				v-model="formData.verifyPassword"
				type="password"
				show-password
				placeholder="Verifica tu contraseña"
				autocomplete="off"
			/>
		</el-form>
		<div>
			<p>La contraseña debe cumplir mínimo estas recomendaciones de seguridad:</p>
			<ul>
				<li>Longitud mínima de 12 caracteres.</li>
				<li>1 letra minúscula.</li>
				<li>1 letra mayúscula.</li>
				<li>1 número.</li>
				<li>1 símbolo.</li>
			</ul>
		</div>
		<div>
			<el-button type="primary" :loading="isLoading" @click="updatePassword">Actualizar contraseña</el-button>
			<el-button plain :disabled="isLoading" @click="goToLogin">Cancelar</el-button>
		</div>
	</section>
</template>
