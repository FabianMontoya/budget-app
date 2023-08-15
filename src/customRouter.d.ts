import 'vue-router';

declare module 'vue-router' {
	interface RouteMeta {
		// is optional
		requiresAdmin?: boolean;
		// must be declared by every route
		requiresAuth?: boolean;
		pageTitle: string;
	}
}
