import './initializers/i18n-initializer';
import './initializers/auth-initializer';

import './styles/style.less';

import type { AxiosError } from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { notification } from 'antd';
import { LabelConstant } from 'constants/label.constant';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Translation } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';

import { FullSpinner } from './components/full-spinner/full-spinner';
import { TranslationProvider } from './components/translation/translation';
import { AppProviders } from './contexts/app/app.context';
import { router } from './routes';
import { AuthProvider } from 'contexts/auth/auth.context';
import { ApplicationMode } from 'components/application-mode/application-mode';
// import reportWebVitals from './reportWebVitals';

function onQueryError(error: unknown) {
  const response = (error as AxiosError<any>).response;

  // handled on auth-interceptor
  if (response?.status === 401) {
    return;
  }

  const errorDescription = response?.data.message ?? response?.data.errorMessage ?? response?.statusText;

  notification.error({
    message: <Translation>{(t) => <strong>{t(LabelConstant.FAILURE)}</strong>}</Translation>,
    description: errorDescription
  });
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: onQueryError,
      refetchOnWindowFocus: false,
      retry: false
    },
    mutations: {
      onError: onQueryError
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <React.Suspense fallback={<FullSpinner style={{ width: '100%', height: '100vh' }} />}>
      <AppProviders>
        <AuthProvider>
          <TranslationProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
              <ApplicationMode />
              <ReactQueryDevtools />
            </QueryClientProvider>
          </TranslationProvider>
        </AuthProvider>
      </AppProviders>
    </React.Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
