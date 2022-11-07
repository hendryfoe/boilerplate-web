import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import { EnvironmentConstant } from 'constants/environment.constant';
import { GeneralConstant } from 'constants/general.constant';

i18n
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: GeneralConstant.DEFAULT_LANGUAGE,
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    debug: EnvironmentConstant.DEV,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
