/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

const isDevelopment = import.meta.env.DEV;

const trace = (...args: any[]) => {
	if (isDevelopment) console.log(...args);
};

const info = (...args: any[]) => {
	if (isDevelopment) console.log('\x1b[36m%s\x1b[0m', `🔵 [ℹ] -`, ...args);
};

const warn = (...args: any[]) => {
	if (isDevelopment) console.warn(`🟠 [⚠] -`, ...args);
};

const error = (...args: any[]) => {
	if (isDevelopment) {
		console.error(`🔴 [✖] -`, ...args);
	} else {
		setTimeout(console.error.bind(console, `🔴 [✖] -`, ...args));
	}
};

export const log = {
	trace,
	info,
	warn,
	error
};
