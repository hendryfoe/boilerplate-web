import { useContext } from 'react';

import { AppContext } from './app.context';

export function useApp() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useApp must be used within a AppProviders');
  }

  return context;
}
