import { GeneralConstant } from 'constants/general.constant';
import { getDecodedAdmin } from './jwt-helper';
import { cookieStorage } from './storage.util';

export function saveTokenAndGetUser(payload: { access_token: string; expired_at: number }) {
  const { access_token: accessToken, expired_at: expiredAt } = payload;
  const user = getDecodedAdmin(accessToken)!;

  cookieStorage.setItem(GeneralConstant.ACCESS_TOKEN, accessToken, {
    expires: new Date(expiredAt),
    sameSite: 'strict',
    secure: true
  });

  return user;
}

export function clearAuth() {
  const tokenKey = GeneralConstant.ACCESS_TOKEN;

  cookieStorage.removeItem(tokenKey);

  window.location.replace('/');
  return;
}
