import { User } from './user.model';

export interface JWTUser extends User {}

export interface JWTUserObject {
  user: JWTUser;
  iat: string;
  exp: string;
  jti: string;
}
