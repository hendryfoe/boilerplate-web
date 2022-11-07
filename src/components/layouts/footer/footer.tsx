import React from 'react';
import { Space, Typography } from 'antd';

const { Text } = Typography;

const year = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <Space style={{ width: '100%', justifyContent: 'center', marginTop: '24px' }}>
      <Text type="secondary">&copy; {year} PT Modal Rakyat Indonesia. All Rights Reserved.</Text>
    </Space>
  );
};

export { Footer };
