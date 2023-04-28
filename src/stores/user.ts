import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

import type { IUserData } from './types/user';

export const useUserStore = defineStore('user', () => {
  // state
  const isLoadingUserInfo = ref(true);
  const isRecoveryPassword = ref(false);
  const userRoutes = ref<RouteRecordRaw[]>([]);
  const userData = ref<IUserData | null>(null);

  // computed

  // methods
  const setUserRoutes = (routes: RouteRecordRaw[]) => {
    userRoutes.value = routes;
  };
  const setUserData = (payload: IUserData | null) => (userData.value = payload);
  const setIsLoadingUserInfo = (payload: boolean) => (isLoadingUserInfo.value = payload);

  return {
    userRoutes,
    setUserRoutes,
    userData,
    setUserData,
    isLoadingUserInfo,
    setIsLoadingUserInfo,
    isRecoveryPassword
  };
});
