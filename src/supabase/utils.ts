//import { useAppStore } from '@/stores/app';
import type { IUserData } from '@/stores/types/user';
import { useUserStore } from '@/stores/user';
import { auth } from '@/supabase';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

// ? This function is for pause the code execution
const awaitFunction = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, 500);
	});
};

export const verifyUserState = async () =>
	new Promise(async (resolve) => {
		// const appStore = useAppStore();
		const userStore = useUserStore();
		if (!userStore.isLoadingUserInfo && !userStore.isLoadingUserInfo) {
			resolve(true);
			return;
		}
		// appStore.setIsLoadingInfo(true);

		const setUserSessionData = (_event: AuthChangeEvent, session: Session | null) => {
			if (session !== null) {
				userStore.setUserData(session.user as IUserData);
			} else {
				userStore.setUserData(null);
			}
		};

		auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
			// appStore.setIsLoadingInfo(false);
			// console.log('verifyUserState', { event, session });
			setUserSessionData(event, session);
			userStore.setIsLoadingUserInfo(false);
		});

		/* while (appStore.isLoadingInfo || userStore.isLoadingUserInfo) { */
		while (userStore.isLoadingUserInfo) {
			await awaitFunction();
		}
		resolve(true);
	});
