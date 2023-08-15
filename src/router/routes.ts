import type { RouteRecordRaw } from 'vue-router';

import BasicLayout from '@/layout/BasicLayout.vue';
import MainLayout from '@/layout/MainLayout.vue';

import LoginView from '@/views/auth/LoginView.vue';
import NotFoundView from '@/views/errors/404View.vue';

const staticPrivateRoutes: RouteRecordRaw[] = [
	{
		path: '/app',
		name: 'app',
		component: MainLayout,
		children: [
			{
				path: 'dashboard',
				name: 'dashboard',
				component: () => import('../views/dashboard/DashboardView.vue'),
				meta: {
					pageTitle: 'pages.dashboard',
					requiresAuth: true
				}
			}
		]
	}
];

export const publicRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		component: BasicLayout,
		children: [
			{
				path: '/:pathMatch(.*)*',
				name: '404',
				component: NotFoundView,
				meta: {
					pageTitle: 'pages.404'
				}
			},
			{
				path: '/about',
				name: 'about',
				// route level code-splitting
				// this generates a separate chunk (About.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import('../views/AboutView.vue')
			},
			{
				path: '500',
				name: '500',
				component: () => import('../views/errors/500View.vue'),
				meta: {
					pageTitle: 'pages.500'
				}
			},
			{
				path: 'redirection-state',
				name: 'redirectionState',
				component: () => import('../views/RedirectionStateView.vue'),
				meta: {
					pageTitle: ''
				}
			}
		]
	},
	{
		path: '/auth',
		component: BasicLayout,
		children: [
			{
				path: 'login',
				name: 'login',
				component: LoginView,
				meta: {
					pageTitle: 'pages.auth.login'
				}
			},
			{
				path: 'restore-password',
				name: 'restorePassword',
				component: () => import('../views/auth/RestorePasswordView.vue'),
				meta: {
					pageTitle: 'pages.auth.restorePassword'
				}
			}
		]
	},
	...staticPrivateRoutes
];
