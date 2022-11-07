import jwtDecode from 'jwt-decode';
import { JWTUser, JWTUserObject } from 'models/jwt-object.model';

export function decodeJWT<TypeData>(value: string): TypeData | null {
  let decodedValue: TypeData;

  try {
    decodedValue = jwtDecode<TypeData>(value);
  } catch (err) {
    console.error(err);
    return null;
  }

  return decodedValue!;
}

export function getDecodedAdmin(token: string): JWTUser | null {
  return decodeJWT<JWTUserObject>(token)?.user ?? null;
}
