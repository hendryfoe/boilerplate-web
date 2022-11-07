import { notification } from 'antd';
import { type AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { GeneralConstant } from 'constants/general.constant';
import { LabelConstant } from 'constants/label.constant';
import { clearAuth } from 'utils/auth.util';
import { axiosInstance } from 'utils/request.util';
import { cookieStorage } from 'utils/storage.util';
import i18next from './i18n-initializer';

function showErrorNotification() {
  notification.error({
    message: 'Terjadi Masalah Koneksi',
    description: 'Koneksi internet Anda terputus, silahkan periksa kembali koneksi Anda atau memuat ulang halaman ini.',
    duration: 5
  });
}

axiosInstance.interceptors.request.use(
  (config): AxiosRequestConfig => {
    const token = cookieStorage.getItem(GeneralConstant.ACCESS_TOKEN);
    const currentLanguage = localStorage.getItem(GeneralConstant.LANGUAGE_TOKEN) ?? GeneralConstant.DEFAULT_LANGUAGE;

    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }

    config.headers!['Content-Type'] = 'application/json';
    config.headers!['Accept-Language'] = currentLanguage;

    return config;
  },
  (err: AxiosError) => {
    if (!err.response || err.message === 'Network Error') {
      console.error('Terjadi Masalah Koneksi', err);
      showErrorNotification();

      return false;
    }

    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response): AxiosResponse => response,
  (err: AxiosError) => {
    if (!err.response || err.message === 'Network Error') {
      console.error('Terjadi Masalah Koneksi', err);
      showErrorNotification();
    } else if (err.response.status === 401) {
      notification.error({
        message: i18next.t(LabelConstant.FAILURE),
        description: (err.response?.data as any).message ?? err.response.statusText,
        duration: 2
      });

      setTimeout(() => {
        clearAuth();
      }, 1500);
    }

    return Promise.reject(err);
  }
);
