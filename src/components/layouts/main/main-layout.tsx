import { Image, Layout, Row, Typography } from 'antd';
import React, { useState } from 'react';

import './main-layout.less';

import { LaunchPad } from 'components/launch-pad/launch-pad';
import { Footer } from 'components/layouts/footer/footer';
import { HeaderContent } from 'components/layouts/header-content/header-content';
import { Sidebar } from 'components/layouts/sidebar/sidebar';
import { useAuth } from 'contexts/auth/use-auth';
import { ChildrenProps } from 'types';
import { HeaderBreadcrumb } from '../header-breadcrumb/header-breadcrumb';

const { Content, Sider } = Layout;

const MainLayout: React.FC<ChildrenProps> = ({ children }) => {
  const { user, handleLogout } = useAuth();

  const [isCollapsed, setCollapse] = useState(false);
  const [launchPadVisible, setLaunchPadVisible] = useState(false);

  const toggleSidebar = () => {
    setCollapse((isCollapsed: boolean) => {
      isCollapsed = !isCollapsed;
      return isCollapsed;
    });
  };

  const handleOnBreakpoint = (isBreakpoint: boolean) => {
    if (isBreakpoint) {
      setCollapse(true);
    } else {
      setCollapse(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', maxHeight: '100vh' }}>
      <Sider
        width={210}
        trigger={null}
        collapsedWidth={55}
        collapsible
        collapsed={isCollapsed}
        breakpoint="md"
        onBreakpoint={handleOnBreakpoint}
        theme="dark"
      >
        <Row justify="center" style={{ padding: '17px 0', backgroundColor: '#00284d' }} align="middle">
          {isCollapsed ? (
            <Typography.Title level={4} style={{ color: 'white' }}>
              PR
            </Typography.Title>
          ) : (
            <Typography.Title level={4} style={{ color: 'white' }}>
              PLACEHOLDER
            </Typography.Title>
          )}
        </Row>
        <Sidebar />
      </Sider>
      <Layout className="main-layout">
        <HeaderContent
          isCollapsed={isCollapsed}
          userFullname={user!.name}
          onToggleSidebar={toggleSidebar}
          onLaunchpadVisible={() => setLaunchPadVisible(true)}
        />
        <HeaderBreadcrumb />
        <Content className="main-layout__content" style={{ overflowY: 'auto' }}>
          {children}
          <Footer />
        </Content>
      </Layout>
      <LaunchPad
        visible={launchPadVisible}
        name={user!.name}
        email={user!.email}
        onLogout={handleLogout}
        onLaunchPadClose={() => setLaunchPadVisible(false)}
      />
    </Layout>
  );
};

export { MainLayout };
