import { ArrowLeftOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Divider, Row, Typography } from 'antd';

import { LabelConstant } from 'constants/label.constant';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { useUserQuery } from '../shared/hooks/use-users.query';

export const userDetailPageRouteHandle = {
  crumb: (t: (key: string) => string, params: Record<string, string>) => (
    <>
      <Breadcrumb.Item>
        <Link to="/dashboard/users">{t('MENU.USERS')}</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{params.id}</Breadcrumb.Item>
    </>
  )
};

function UserDetailPage() {
  const { t } = useTranslation();
  const params = useParams();
  const { isLoading, data } = useUserQuery(params.id!);

  const backNavigationLink = '/dashboard/users';

  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <Card>
          <Link to={backNavigationLink}>
            <Button icon={<ArrowLeftOutlined />}>{t(LabelConstant.BACK)}</Button>
          </Link>
        </Card>
      </Col>
      <Col span={24}>
        <Card loading={isLoading} style={{ minHeight: 400 }}>
          <Row gutter={[20, 10]}>
            <Col xs={24} lg={2}>
              <Typography.Text strong>{t(LabelConstant.NAME)}</Typography.Text>
            </Col>
            <Col xs={24} lg={12}>
              : {data?.data.name}
            </Col>
          </Row>
          <Divider />
          <Row gutter={[20, 10]}>
            <Col xs={24} lg={2}>
              <Typography.Text strong>{t(LabelConstant.EMAIL)}</Typography.Text>
            </Col>
            <Col xs={24} lg={12}>
              : {data?.data.email}
            </Col>
          </Row>
          <Divider />
          <Row gutter={[20, 10]}>
            <Col xs={24} lg={2}>
              <Typography.Text strong>{t(LabelConstant.GENDER)}</Typography.Text>
            </Col>
            <Col xs={24} lg={12}>
              : {data?.data.gender}
            </Col>
          </Row>
          <Divider />
          <Row gutter={[20, 10]}>
            <Col xs={24} lg={2}>
              <Typography.Text strong>{t(LabelConstant.PHONE)}</Typography.Text>
            </Col>
            <Col xs={24} lg={12}>
              : {data?.data.phone}
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export { UserDetailPage };
export default UserDetailPage;
