import { i18n } from '@lingui/core';
import { en, es } from 'make-plural/plurals';

export const locales = {
	en: 'English',
	es: 'Español',
};

export const defaultLocale = 'en';

i18n.loadLocaleData({
	en: { plurals: en },
	es: { plurals: es },
});

export async function dynamicActiveLocale(locale: string) {
	const { messages } = await import(`../locales/${locale}/messages.po`);
	i18n.load(locale, messages);
	i18n.activate(locale);
}
