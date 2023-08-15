<script setup lang="ts">
import router from '@/router';
import { auth } from '@/supabase';
import { showMessage, validateEmail } from '@/utils';
import { log } from '@/utils/logger';
import { computed, reactive, ref } from 'vue';

const loginInfo = reactive({
	username: '',
	password: ''
});
const isLoading = ref(false);

const incompleteFields = computed(() => !(loginInfo.username && loginInfo.password));

const validateLogin = async () => {
	try {
		isLoading.value = true;

		const { error } = await auth.signInWithPassword({
			email: loginInfo.username,
			password: loginInfo.password
		});

		if (!error) {
			router.push({ name: 'dashboard' });
			return;
		}

		switch (error.message) {
			case 'Invalid login credentials':
				showMessage('Usuario o contraseña incorrecta. Favor verifique los datos.', 'error');
				break;
			case 'auth/user-disabled': // TODO: Check how disable an user into supabase
				showMessage('Usuario deshabilitado.', 'warning');
				break;
			default:
				log.error('Auth error: ', { error });
				showMessage('Ocurrió un error y no se pudo hacer login.', 'error');
		}
	} catch (error) {
		log.error(error);
		showMessage('Ocurrió un error y no se pudo hacer login.', 'error');
	} finally {
		loginInfo.password = '';
		isLoading.value = false;
	}
};

const recoveryPassword = async () => {
	const email = prompt('Ingrese email:');

	if (!email) {
		return;
	}

	if (!validateEmail(email)) {
		showMessage('Por favor ingrese una dirección de correo electrónico valida.', 'error');
		return;
	}

	isLoading.value = true;

	const { error } = await auth.resetPasswordForEmail(email, {
		redirectTo: window.location.origin + '/redirection-state'
	});

	isLoading.value = false;

	if (error) {
		showMessage(
			'Lo sentimos, ocurrió un error y no se logró enviar el correo para restablecer la contraseña.',
			'error'
		);

		return;
	}
	showMessage(
		`Se envió un correo electrónico a la dirección ${email} para restablecer tu contraseña de acceso.`,
		'success'
	);
};
</script>

<template>
	<section v-loading="isLoading" class="mt-5 flex flex-col gap-4">
		<p>Ingrese sus datos de acceso</p>
		<el-form :disabled="isLoading" class="w-full">
			<el-form-item>
				<el-input v-model="loginInfo.username" type="email" maxlength="100" placeholder="Email" />
			</el-form-item>
			<el-form-item>
				<el-input
					v-model="loginInfo.password"
					type="password"
					show-password
					maxlength="100"
					placeholder="Password"
					@keydown.enter="validateLogin"
				/>
			</el-form-item>
		</el-form>
		<div class="flex justify-end gap-2">
			<el-button
				type="primary"
				:disabled="incompleteFields || isLoading"
				:loading="isLoading"
				@click.stop="validateLogin"
			>
				Login
			</el-button>
			<el-button link :disabled="isLoading" @click.stop="recoveryPassword">Olvidé mi contraseña</el-button>
		</div>
	</section>
</template>
