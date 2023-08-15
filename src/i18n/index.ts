import { getBrowserLocales } from '@/utils';
import { createI18n } from 'vue-i18n';
import translations from './translations';

const DEFAULT_LANG = 'es';

const getBrowserLang = () => {
	const langs = getBrowserLocales({ languageCodeOnly: true });
	if (langs === undefined) {
		return DEFAULT_LANG;
	}
	if (langs.includes(DEFAULT_LANG)) {
		return DEFAULT_LANG;
	}
	return langs[0];
};

const userLocale = getBrowserLang();

const i18n = createI18n({
	allowComposition: true,
	legacy: false,
	seo: true,
	locale: userLocale,
	fallbackLocale: DEFAULT_LANG,
	messages: translations
});

document.documentElement.setAttribute('lang', userLocale);

export default i18n;
