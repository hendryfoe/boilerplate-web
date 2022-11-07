import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { FullSpinner } from 'components/full-spinner/full-spinner';
import { GeneralConstant } from 'constants/general.constant';
import { AuthAction } from 'contexts/auth/auth.action';
import { useAuth } from 'contexts/auth/use-auth';
import { ApiService } from 'services/api.service';
import { getDecodedAdmin } from 'utils/jwt-helper';
import { cookieStorage } from 'utils/storage.util';

function VerifyAuth(props: { children: JSX.Element }) {
  const { user, dispatch } = useAuth();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['verify'],
    queryFn: ApiService.PostVerify,
    retry: false,
    enabled: user != null
  });

  useEffect(() => {
    if (isSuccess) {
      const { access_token: accessToken, expired_at: expiredAt } = data;
      const user = getDecodedAdmin(accessToken);

      cookieStorage.setItem(GeneralConstant.ACCESS_TOKEN, accessToken, {
        expires: new Date(expiredAt),
        sameSite: 'strict',
        secure: true
      });

      dispatch(AuthAction.SetAuth({ user }));
    }
  }, [data, dispatch, isSuccess]);

  if (isLoading && user) {
    return <FullSpinner style={{ width: '100%', height: '100vh' }} />;
  }

  return props.children;
}

export { VerifyAuth };
