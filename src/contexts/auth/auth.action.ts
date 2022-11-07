import { JWTUser } from 'models/jwt-object.model';

export interface AuthPayload {
  user: JWTUser | null;
}

export enum AuthActionType {
  SetAuth = 'SET_AUTH',
  ClearAuth = 'CLEAR_AUTH'
}

export type AuthActions = { type: AuthActionType.SetAuth; payload: AuthPayload } | { type: AuthActionType.ClearAuth };

export const AuthAction = {
  SetAuth(payload: AuthPayload): AuthActions {
    return { type: AuthActionType.SetAuth, payload };
  },
  ClearAuth(): AuthActions {
    return { type: AuthActionType.ClearAuth };
  }
};
