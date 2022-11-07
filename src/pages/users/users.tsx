import { EditOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Col, Row, Space, Table, type TableColumnsType } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { LabelConstant } from 'constants/label.constant';
import { User } from 'models/user.model';
import { formatDate } from 'utils/date.util';
import { UserHeaderFilter } from './shared/components/user-header-filter';
import { UserFilter, useUsersQuery } from './shared/hooks/use-users.query';

export const userPageRouteHandle = {
  crumb: (t: (key: string) => string) => <Breadcrumb.Item>{t('MENU.USERS')}</Breadcrumb.Item>
};

function getTableColumn(t: (key: string) => string): TableColumnsType<User> {
  return [
    {
      title: t(LabelConstant.NAME),
      render: (_, user: User) => {
        return <Link to={`/dashboard/users/${user.id}/detail`}>{user.name}</Link>;
      }
    },
    {
      title: t(LabelConstant.EMAIL),
      dataIndex: ['email']
    },
    {
      title: t(LabelConstant.GENDER),
      dataIndex: ['gender']
    },
    {
      title: t(LabelConstant.PHONE),
      dataIndex: ['phone']
    },
    {
      title: t(LabelConstant.CREATED_AT),
      render: (_, { created_at }: User) => {
        return <>{formatDate(new Date(created_at), 'dd MMM yyyy, HH:mm:ss')}</>;
      }
    },
    {
      title: t(LabelConstant.UPDATED_AT),
      render: (_, { updated_at }: User) => {
        return <>{formatDate(new Date(updated_at), 'dd MMM yyyy, HH:mm:ss')}</>;
      }
    }
  ];
}

const UserPage: React.FC = () => {
  const [filters, setFilters] = useState<UserFilter>(() => ({
    page: 1,
    limit: 10,
    q: undefined!
  }));

  const { t } = useTranslation();
  const posts = useUsersQuery(filters);

  const isLoading = posts.isLoading;

  function handleFiltersChange(payload: Partial<UserFilter>) {
    setFilters((prevFilters) => ({ ...prevFilters, page: 1, ...payload }));
  }

  function handleChangePagination(page: number, pageSize?: number) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page,
      limit: pageSize || prevFilters.limit
    }));
  }

  const pagination = {
    total: posts?.data?.meta.total_rows,
    pageSize: filters.limit,
    current: filters.page,
    onChange: handleChangePagination
  };

  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <Card>
          <UserHeaderFilter
            isLoading={isLoading}
            filters={{ searchTerm: filters.q }}
            onFiltersChange={handleFiltersChange}
          />
        </Card>
      </Col>
      <Col span={24}>
        <Card>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Table
              loading={isLoading}
              scroll={{ x: 'max-content' }}
              dataSource={posts?.data?.data}
              columns={getTableColumn(t)}
              rowKey="id"
              pagination={pagination}
            />
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export { UserPage };
export default UserPage;
