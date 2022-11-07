import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Divider, Layout, Row, Space, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { ChangeLanguage } from 'components/change-language/change-language';
import { LabelConstant } from 'constants/label.constant';

import './header-content.less';

const { Header } = Layout;
const { Text, Title } = Typography;

interface HeaderContentProps {
  isCollapsed: boolean;
  onToggleSidebar: VoidFunction;
  onLaunchpadVisible: VoidFunction;
  userFullname: string;
}

const HeaderContent: React.FC<HeaderContentProps> = ({
  userFullname,
  isCollapsed,
  onToggleSidebar,
  onLaunchpadVisible
}) => {
  const { t } = useTranslation();

  return (
    <Header className="content-header">
      <Row justify="space-between" wrap={false}>
        <Col>
          <Space size={15}>
            {React.createElement(isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: onToggleSidebar
            })}
            <Title className="content-header__title" level={4} style={{ marginBottom: 5 }}>
              {t(LabelConstant.BOILERPLATE_WEB_TITLE)}
            </Title>
          </Space>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <Space wrap={false} size={0} style={{ width: '100%' }}>
            <ChangeLanguage />
            <Divider type="vertical" />
            <Space className="user__wrapper" size="small" onClick={onLaunchpadVisible}>
              <UserOutlined style={{ transform: 'translateY(1px)' }} />
              <Text className="user__full-name">{userFullname}</Text>
            </Space>
          </Space>
        </Col>
      </Row>
    </Header>
  );
};

export { HeaderContent };
