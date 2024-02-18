/* i18n */
import { createI18n } from 'vue-i18n';
import en from './locales/en-US.json';
import ru from './locales/ru-RU.json';
const messages = {
  en,
  ru,
};
const setLocale = (locale) => {
  return ['ru', 'be', 'uz', 'kk', 'az', 'hy', 'ky', 'mo'].includes(locale)
    ? 'ru'
    : 'en';
};
const i18n = createI18n({
  legacy: false,
  strategy: 'prefix',
  locale: setLocale(window.navigator.language.slice(0, 2)),
  messages,
  allowComposition: true,
  warnHtmlMessage: false,
  missingWarn: false,
  fallbackWarn: false,
  globalInjection: true,
  silentTranslationWarn: true,
  defaultLocale: 'ru',
  lazy: true,
});
export default i18n;
