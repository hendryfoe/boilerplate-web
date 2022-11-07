import { notification } from 'antd';
import type { AxiosError } from 'axios';
import { LabelConstant } from 'constants/label.constant';
import React, { createContext, useReducer } from 'react';
// import { flushSync } from 'react-dom';
import { Translation } from 'react-i18next';
import { ApiService } from 'services/api.service';

import { ChildrenProps } from 'types';
import { clearAuth, saveTokenAndGetUser } from 'utils/auth.util';
import { AuthActions, AuthAction } from './auth.action';
import { authInitializer, authReducer, AuthState, initialState } from './auth.store';

export interface AuthContextProps extends AuthState {
  handleLogout: VoidFunction;
  handleLogin: (payload: { email: string; password: string }, callback: VoidFunction) => Promise<void>;
  dispatch: React.Dispatch<AuthActions>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function AuthProvider({ children }: ChildrenProps) {
  const [authState, dispatch] = useReducer(authReducer, initialState, authInitializer);

  const handleLogout = () => {
    clearAuth();
  };

  const handleLogin = async (payload: { email: string; password: string }, callback: VoidFunction) => {
    try {
      const data = await ApiService.PostSignin(payload);
      const user = saveTokenAndGetUser(data);

      dispatch(AuthAction.SetAuth({ user }));
      callback();
      // flushSync(() => {});
    } catch (err) {
      const response = (err as AxiosError).response as any;
      const errorDescription = response.data?.message ?? response.statusText;

      notification.error({
        message: <Translation>{(t) => <strong>{t(LabelConstant.FAILURE)}</strong>}</Translation>,
        description: errorDescription
      });
    }
  };

  const value = { ...authState, dispatch, handleLogout, handleLogin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider };
