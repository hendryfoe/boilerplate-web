import Cookies, { CookieAttributes } from 'js-cookie';

class CookieStorage implements Storage {
  get length(): number {
    const allCookies = Cookies.get();
    return Object.keys(allCookies).length;
  }

  clear(): void {
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach((cookieKey: string) => {
      Cookies.remove(cookieKey);
    });
  }

  getItem(key: string): string | null {
    return Cookies.get(key) ?? null;
  }

  key(index: number): string | null {
    const allCookies = Cookies.get();
    const cookiesKeyAtIndex = Object.keys(allCookies)[index];

    return Cookies.get(cookiesKeyAtIndex) ?? null;
  }

  removeItem(key: string, options?: CookieAttributes): void {
    Cookies.remove(key, options);
  }

  setItem(key: string, value: string, options?: CookieAttributes): void {
    Cookies.set(key, value, options);
  }
}
const cookieStorage = new CookieStorage();

export { cookieStorage };
