import { render, screen } from '@testing-library/react';

import { AppContext } from 'contexts/app/app.context';
import { mockAppContextValue } from 'utils/test-utils';
import { ChangeLanguage } from './change-language';

describe('ChangeLanguage', () => {
  it('should be defined with `id` translation', async () => {
    render(
      <AppContext.Provider value={mockAppContextValue('id')}>
        <ChangeLanguage />
      </AppContext.Provider>
    );

    expect(screen).toBeDefined();
    expect(screen.getByText('ID')).toBeInTheDocument();
  });

  it('should be defined with `en` translation', () => {
    render(
      <AppContext.Provider value={mockAppContextValue('en')}>
        <ChangeLanguage />
      </AppContext.Provider>
    );

    expect(screen).toBeDefined();
    expect(screen.getByText('EN')).toBeInTheDocument();
  });
});
