const useTranslation = () => {
  return {
    t: (value: string) => value,
    i18n: {
      language: 'id',
      changeLanguage: jest.fn()
    }
  };
};

export { useTranslation };
