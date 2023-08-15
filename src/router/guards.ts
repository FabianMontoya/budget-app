import { auth } from '@/supabase';
import { verifyUserState } from '@/supabase/utils';
import { getPageTitle } from '@/utils';
import { log } from '@/utils/logger';
import nProgress from 'nprogress';
import router from './index';

router.beforeEach(async (to, _from, next) => {
	nProgress.start();
	nProgress.set(0.2);

	await verifyUserState();
	const { data } = await auth.getSession();
	const user = data.session?.user ?? undefined;

	if (!to.name) {
		next({ name: 'login' });
		return;
	}

	if (to.name === 'login' && user) {
		next({ name: 'dashboard' });
		return;
	}

	if (to.meta.requiresAuth && !user && to.name !== 'login') {
		log.warn('User tried to enter into a path that requires authentication.');
		next({ name: 'login' });
		return;
	}

	return next();
});

router.afterEach(async (to) => {
	document.title = getPageTitle(to.meta.pageTitle);
	nProgress.done();
});
