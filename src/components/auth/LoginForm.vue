<script setup lang="ts">
import router from '@/router';
import { auth } from '@/supabase';
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
        alert('Usuario o contraseña incorrecta.');
        break;
      case 'auth/user-disabled':
        alert('Usuario deshabilitado..');
        break;
      default:
        console.error('Auth error: ', { error });
        alert('Ocurrió un error y no se pudo hacer login.');
    }
  } catch (error) {
    console.error(error);
    alert('Ocurrió un error y no se pudo hacer login.');
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

  isLoading.value = true;

  const { data, error } = await auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/redirection-state'
  });

  console.log({ data, error }); // TODO: Delete this
  isLoading.value = false;

  if (error) {
    alert('Lo sentimos, ocurrió un error y no se logró enviar el correo para restablecer la contraseña.');
    return;
  }
  alert(`Se envió un correo electrónico a la dirección ${email} para restablecer tu contraseña de acceso.`);
};
</script>
<template>
  <section class="mt-5 flex flex-col gap-5">
    <p>Ingrese sus datos de acceso</p>
    <form :disabled="isLoading" class="flex gap-2">
      <input v-model="loginInfo.username" required type="email" placeholder="email" />
      <input v-model="loginInfo.password" type="password" placeholder="password" />
    </form>
    <div class="flex gap-2">
      <button :disabled="incompleteFields || isLoading" @click="validateLogin">Login</button>
      <button :disabled="isLoading" @click="recoveryPassword">Olvidé mi contraseña</button>
    </div>
    <div v-if="isLoading">
      <p>Procesando solicitud, por favor espere...</p>
    </div>
  </section>
</template>