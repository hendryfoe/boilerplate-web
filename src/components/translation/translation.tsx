import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useApp } from 'contexts/app/use-app';

function TranslationProvider(props: { children: JSX.Element }) {
  const { language } = useApp();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [i18n, language]);

  return props.children;
}

export { TranslationProvider };
