import { GeneralConstant } from 'constants/general.constant';
import { JWTUser } from 'models/jwt-object.model';
import { getDecodedAdmin } from 'utils/jwt-helper';
import { cookieStorage } from 'utils/storage.util';
import { AuthActions, AuthActionType, AuthPayload } from './auth.action';

const tokenKey = GeneralConstant.ACCESS_TOKEN;

export interface AuthState extends AuthPayload {}

interface InitialStateProps {
  user: JWTUser | null;
}

export function authReducer(state: AuthState, action: AuthActions) {
  switch (action.type) {
    case AuthActionType.SetAuth: {
      const { user } = action.payload;

      return { ...state, user };
    }

    case AuthActionType.ClearAuth: {
      return { ...initialState };
    }

    default:
      throw new Error(`Auth Reducer with action "${(action as any).type}" not found!`);
  }
}

export const initialState: InitialStateProps = {
  user: null
};

export function authInitializer() {
  const token = cookieStorage.getItem(tokenKey);
  const user = token != null && token !== '' ? getDecodedAdmin(token!) : null;

  return { user };
}
