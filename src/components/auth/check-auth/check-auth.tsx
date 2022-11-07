import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from 'contexts/auth/use-auth';

function CheckAuth(props: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.user == null && location.pathname !== '/') {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (auth.user != null && location.pathname === '/') {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return props.children;
}

export { CheckAuth };
