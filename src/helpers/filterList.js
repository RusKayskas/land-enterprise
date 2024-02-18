import { $i18n } from '@/main';
export const filterList = (element) => {
  const locale = $i18n.value.global.locale;
  return element.filter((item) => item.hide !== locale);
};
