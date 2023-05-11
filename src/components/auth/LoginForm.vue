<script setup lang="ts">
import Button from '@/components/ui/button/index.vue';
import Input from '@/components/ui/input/index.vue';
import router from '@/router';
import { auth } from '@/supabase';
import { showMessage, validateEmail } from '@/utils';
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

    const { data, error } = await auth.signInWithPassword({
      email: loginInfo.username,
      password: loginInfo.password
    });

    console.log({ data, error }); // TODO: Delete this

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
        console.error('Auth error: ', { error });
        showMessage('Ocurrió un error y no se pudo hacer login.', 'error');
    }
  } catch (error) {
    console.error(error);
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

  const { data, error } = await auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/redirection-state'
  });

  console.log({ data, error }); // TODO: Delete this
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
  <section class="mt-5 flex flex-col gap-5" v-loading="isLoading">
    <p>Ingrese sus datos de acceso</p>
    <form :disabled="isLoading" class="flex gap-2">
      <div class="my-3">
        <Input v-model="loginInfo.username" type="email" placeholder="email" />
      </div>
      <div class="my-3">
        <Input v-model="loginInfo.password" type="password" placeholder="password" />
      </div>
    </form>
    <div class="flex gap-2">
      <Button type="primary" :disabled="incompleteFields || isLoading" name="Login" @click.stop="validateLogin" />
      <Button type="secondary" :disabled="isLoading" name="Olvidé mi contraseña" @click.stop="recoveryPassword" />
    </div>
  </section>
</template>
