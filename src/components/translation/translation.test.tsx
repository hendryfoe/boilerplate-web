import { render, screen } from '@testing-library/react';

import { AppContext } from 'contexts/app/app.context';
import { mockAppContextValue } from 'utils/test-utils';
import { TranslationProvider } from './translation';

const mockChangeLanguage = jest.fn();
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      i18n: {
        language: 'en',
        changeLanguage: mockChangeLanguage
      }
    };
  }
}));

describe('TranslationProvider', () => {
  beforeEach(() => {
    mockChangeLanguage.mockClear();
  });

  it('should be defined', () => {
    render(
      <AppContext.Provider value={mockAppContextValue('en')}>
        <TranslationProvider>
          <div>Hello World</div>
        </TranslationProvider>
      </AppContext.Provider>
    );

    expect(screen).toBeDefined();
  });

  it('should trigger changeLanguage successfully', async () => {
    render(
      <AppContext.Provider value={mockAppContextValue('id')}>
        <TranslationProvider>
          <div>Hello World</div>
        </TranslationProvider>
      </AppContext.Provider>
    );

    expect(screen).toBeDefined();
    expect(mockChangeLanguage).toHaveBeenCalled();
  });
});
