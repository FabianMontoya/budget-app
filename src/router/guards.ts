import { auth } from '@/supabase';
import { verifyUserState } from '@/supabase/utils';
import { getPageTitle } from '@/utils';
import nProgress from 'nprogress';
import router from './index';

router.beforeEach(async (to, _from, next) => {
  nProgress.start();
  nProgress.set(0.2);

  await verifyUserState();
  const { data } = await auth.getSession();
  const user = data.session?.user ?? undefined;

  console.log({ data, user });

  if (!to.name) {
    next({ name: 'login' });
    return;
  }

  if (to.name === 'login' && user) {
    next({ name: 'dashboard' });
    return;
  }

  if (to.meta.requiresAuth && !user && to.name !== 'login') {
    console.warn('User tried to enter into a path that requires authentication.');
    next({ name: 'login' });
    return;
  }

  return next();
});

router.afterEach(async (to, _from) => {
  document.title = getPageTitle(to.meta.pageTitle);
  nProgress.done();
});
