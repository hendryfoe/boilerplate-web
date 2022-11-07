import { decodeJWT } from '../jwt-helper';

describe('decodeJWT', () => {
  it('should decodeJWT token correctly', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation();
    const result = decodeJWT(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    );
    const expectedResult = {
      sub: '1234567890',
      name: 'John Doe',
      iat: 1516239022
    };

    expect(result).toEqual(expectedResult);
    expect(consoleError).not.toHaveBeenCalled();
  });

  it('should catch failure decodeJWT token correctly', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation();

    const result = decodeJWT(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0joxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    );

    expect(result).toBeNull();
    expect(consoleError).toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalledTimes(1);
  });
});
