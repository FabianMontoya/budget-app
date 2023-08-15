import { APP_NAME } from '@/constants';
import i18n from '@/i18n';
import { useUserStore } from '@/stores/user';
import type { messageTypes } from '@/types/app';
import { ElMessage, ElNotification } from 'element-plus';
import type { VNode } from 'vue';

export const getEnv = (): ImportMetaEnv => import.meta && import.meta.env;

export const validateEmail = (email: string): boolean => {
	const match = email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);

	return match ? true : false;
};

export const isNumber = (value: string) => !value || /^\d+$/.test(value);

export const allowOnlyNumbers = (evt: KeyboardEvent) => {
	const keysAllowed: string[] = [
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'Backspace',
		'Enter',
		'ArrowLeft',
		'ArrowRight'
	];
	const keyPressed: string = evt.key;

	if (!keysAllowed.includes(keyPressed)) {
		evt.preventDefault();
		return;
	}
};

export const allowOnlyDecimal = (evt: KeyboardEvent) => {
	const keysAllowed: string[] = [
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'.',
		'Backspace',
		'Enter',
		'ArrowLeft',
		'ArrowRight'
	];
	const keyPressed: string = evt.key;

	if (!keysAllowed.includes(keyPressed)) {
		evt.preventDefault();
		return;
	}
};

export const isString = (str: any) => typeof str === 'string' || str instanceof String;

export const isArray = (arg: any) => {
	if (typeof Array.isArray === 'undefined') {
		return Object.prototype.toString.call(arg) === '[object Array]';
	}
	return Array.isArray(arg);
};

export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path);

export const isValidUrl = (url: string) => {
	const reg =
		/^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
	return reg.test(url);
};

export const getPageTitle = (pageName: string) => {
	if (!pageName) {
		return APP_NAME;
	}
	return `${i18n.global.t(pageName)} - ${APP_NAME}`;
};

export function getBrowserLocales(options = {}) {
	const defaultOptions = {
		languageCodeOnly: false
	};
	const opt = {
		...defaultOptions,
		...options
	};
	const browserLocales = navigator.languages === undefined ? [navigator.language] : navigator.languages;
	if (!browserLocales) {
		return undefined;
	}
	return browserLocales.map((locale) => {
		const trimmedLocale = locale.trim();
		return opt.languageCodeOnly ? trimmedLocale.split(/-|_/)[0] : trimmedLocale;
	});
}

export const numberToCurrency = (value: number) => {
	/*const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  return formatter.format(value);*/

	if (!value || isNaN(value) || value === 0) {
		return '$ -';
	}

	const decimals = value.toString().includes('.') ? 2 : 0;
	return '$ ' + value.toFixed(decimals).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
};

export const showMessage = (message: string | VNode, type: messageTypes, duration: number = 5000) => {
	ElMessage({
		message: message,
		type: type,
		duration: duration,
		showClose: true
	});
};

export const showNotification = (
	message: string | VNode,
	title: string | undefined,
	type: messageTypes,
	duration: number = 5000
) => {
	ElNotification({
		message: message,
		title: title,
		type: type,
		duration: duration,
		showClose: true
	});
};

export const getUserId = (): string => {
	const userStore = useUserStore();
	return userStore.userData?.id ?? '';
};
