import { format } from 'date-fns';
import i18n from 'i18next';

import { Locales } from 'models/language.enum';

export const formatDate = (date: Date | number, formatStyle: string = 'dd MMM yyyy') => {
  const locale = i18n.language as keyof typeof Locales;
  return format(date, formatStyle, { locale: Locales[locale] });
};
