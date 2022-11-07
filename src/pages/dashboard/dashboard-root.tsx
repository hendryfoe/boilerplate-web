import { Breadcrumb } from 'antd';
import { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { MainLayout } from 'components/layouts/main/main-layout';

export const dashboardRootPageRouteHandle = {
  crumb: (t: (key: string) => string) => (
    <Breadcrumb.Item>
      <Link to="/dashboard">{t('MENU.DASHBOARD')}</Link>
    </Breadcrumb.Item>
  )
};

function DashboardRootPage() {
  return (
    <Fragment>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </Fragment>
  );
}

export { DashboardRootPage };
export default DashboardRootPage;
