import { createRouter, createWebHistory } from 'vue-router';
import { publicRoutes } from './routes';

const initRouter = () =>
	createRouter({
		history: createWebHistory(import.meta.env.BASE_URL),
		// _to, _from, _savedPosition
		scrollBehavior() {
			return { top: 0 };
		},
		routes: publicRoutes
	});

const router = initRouter();

export default router;
