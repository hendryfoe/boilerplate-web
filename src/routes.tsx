import { DashboardOutlined, MailOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import {
  createBrowserRouter,
  createRoutesFromElements,
  isRouteErrorResponse,
  Link,
  Route,
  useRouteError
} from 'react-router-dom';

import { CheckAuth } from 'components/auth/check-auth/check-auth';
import { NotAuthorized } from 'components/not-authorized/not-authorized';
import { NotFound } from 'components/not-found/not-found';
import { EnvironmentConstant } from 'constants/environment.constant';
import DashboardPage from 'pages/dashboard/dashboard';
import { Login } from 'pages/login/login';
import PostFormPage, { postFormAddPageRouteHandle, postFormEditPageRouteHandle } from 'pages/posts/form/post-form';
import PostPage, { postPageRouteHandle } from 'pages/posts/posts';
import { Root } from 'pages/root';
import UserDetailPage, { userDetailPageRouteHandle } from 'pages/users/detail/user-detail';
import UserPage, { userPageRouteHandle } from 'pages/users/users';
import DashboardRootPage, { dashboardRootPageRouteHandle } from 'pages/dashboard/dashboard-root';

export const sidebarNavigationItems: (t: (a: any) => string) => MenuProps['items'] = (t) => [
  { label: <Link to="/dashboard">{t('MENU.DASHBOARD')}</Link>, key: '/dashboard', icon: <DashboardOutlined /> }, // remember to pass the key prop
  { label: <Link to="/dashboard/users">{t('MENU.USERS')}</Link>, key: '/dashboard/users', icon: <UserOutlined /> },
  { label: <Link to="/dashboard/posts">{t('MENU.POSTS')}</Link>, key: '/dashboard/posts', icon: <MailOutlined /> },
  {
    label: 'sub menu',
    key: 'submenu',
    icon: <MenuOutlined />,
    children: [{ label: 'item 3', key: 'submenu-item-1' }]
  }
];

function PageErrorBoundary() {
  let error = useRouteError();

  // We only care to handle 401's at this level, so if this is not a 401
  // ErrorResponse, re-throw to let the RootErrorBoundary handle it
  if (!isRouteErrorResponse(error) || error.status !== 401) {
    console.log('aaaa');
    throw error;
  }

  return (
    <>
      <h1>You do not have access to this project</h1>
      <p>
        Please reach out to <a href={`mailto:${error.data.contactEmail}`}>{error.data.contactEmail}</a> to obtain
        access.
      </p>
    </>
  );
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<NotFound />}>
      <Route
        index
        element={
          <CheckAuth>
            <Login />
          </CheckAuth>
        }
      />
      <Route
        path="dashboard"
        element={
          <CheckAuth>
            <DashboardRootPage />
          </CheckAuth>
        }
        handle={dashboardRootPageRouteHandle}
      >
        <Route index element={<DashboardPage />} />
        <Route path="posts" element={<PostPage />} handle={postPageRouteHandle} />
        <Route path="posts/add" element={<PostFormPage />} handle={postFormAddPageRouteHandle} />
        <Route path="posts/:id/edit" element={<PostFormPage />} handle={postFormEditPageRouteHandle} />
        <Route path="users" element={<UserPage />} handle={userPageRouteHandle} />
        <Route path="users/:id/detail" element={<UserDetailPage />} handle={userDetailPageRouteHandle} />
      </Route>
      <Route path="403" element={<NotAuthorized />} />
      <Route path="404" element={<NotFound />} />
    </Route>
  ),
  {
    basename: EnvironmentConstant.VITE_BASE_PATH
  }
);
