import React from 'react';
import { useLocalStorageState } from 'ahooks';

import { GeneralConstant } from 'constants/general.constant';
import { ChildrenProps } from 'types';

export interface AppContextProps {
  language: string;
  setLanguage: (language: string) => void;
}

export const AppContext = React.createContext<AppContextProps>(undefined!);

export function AppProviders({ children }: ChildrenProps) {
  const [language, setLanguage] = useLocalStorageState<string>(GeneralConstant.LANGUAGE_TOKEN, {
    defaultValue: GeneralConstant.DEFAULT_LANGUAGE
  });
  const value = { language, setLanguage };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
