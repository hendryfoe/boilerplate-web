import { Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { sidebarNavigationItems } from '../../../routes';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['/']}
      selectedKeys={[location.pathname]}
      items={sidebarNavigationItems(t)}
    />
  );
};

export { Sidebar };
