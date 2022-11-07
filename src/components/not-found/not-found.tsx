import { Button, Layout, Space, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { LabelConstant } from 'constants/label.constant';

const { Text, Title } = Typography;

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout
      style={{
        minHeight: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Title level={2} style={{ margin: 0 }}>
        404
      </Title>
      <Space direction="vertical" align="center" size={0}>
        <Title level={4} style={{ margin: 0 }}>
          {t(LabelConstant.NOT_FOUND_TITLE)}
        </Title>
        <Text type="secondary">{t(LabelConstant.NOT_FOUND_DESCRIPTION)}</Text>
        <br />
        <Button type="primary">
          <Link to="/">{t(LabelConstant.BACK_TO_HOME)}</Link>
        </Button>
      </Space>
    </Layout>
  );
};

export { NotFound };
