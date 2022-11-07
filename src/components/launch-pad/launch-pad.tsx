import React from 'react';
import { LogoutOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Typography, Divider, Space, Drawer, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import './launch-pad.less';

import { EndpointConstant } from 'constants/endpoint.constant';
import { LabelConstant } from 'constants/label.constant';

const { Text } = Typography;

interface LaunchPadProps {
  name: string;
  email: string;
  visible: boolean;
  onLogout: VoidFunction;
  onLaunchPadClose: VoidFunction;
}

const LaunchPad: React.FC<LaunchPadProps> = ({ name, email, visible, onLogout, onLaunchPadClose }) => {
  const { t } = useTranslation();

  return (
    <Drawer
      className="launchpad"
      width="350px"
      closable={false}
      placement="right"
      open={visible}
      onClose={onLaunchPadClose}
    >
      <Space direction="vertical" className="launchpad__container">
        <Space direction="vertical">
          <Space size="middle">
            <Button type="primary" size="large" icon={<UserOutlined />} />
            <Space direction="vertical" size={0}>
              <Text ellipsis strong style={{ fontSize: '16px', width: 260 }}>
                {name}
              </Text>
              <Text ellipsis style={{ width: 260 }} type="secondary">
                {email}
              </Text>
            </Space>
          </Space>
        </Space>
        <Divider type="horizontal" style={{ margin: '5px 0' }} />
        <div className="launchpad__link-wrapper">
          <Space size="middle" className="launchpad__item" onClick={onLogout}>
            <LogoutOutlined />
            <Text>{t(LabelConstant.LOGOUT)}</Text>
          </Space>
        </div>
      </Space>
    </Drawer>
  );
};

export { LaunchPad };
