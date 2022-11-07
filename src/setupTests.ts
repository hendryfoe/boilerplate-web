// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('constants/environment.constant', () => {
  return {
    EnvironmentConstant: {
      // MODE
      // PROD
      // SSR
      // DEV
      // BASE_URL
      // VITE_BASE_PATH
      // VITE_MODE_ENV
      // VITE_AUTH_URL
    }
  };
});

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn()
});

window.scrollTo = jest.fn();
