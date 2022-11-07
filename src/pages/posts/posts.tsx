import { EditOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Breadcrumb, Card, Col, Modal, notification, Row, Space, Table, TableColumnsType } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { LabelConstant } from 'constants/label.constant';
import { Post } from 'models/post.model';
import { formatDate } from 'utils/date.util';
import { PostHeaderFilter } from './shared/components/post-header-filter';
import { useDeletePostMutation } from './shared/hooks/use-posts.mutation';
import { PostFilter, usePostsQuery } from './shared/hooks/use-posts.query';

export const postPageRouteHandle = {
  crumb: (t: (key: string) => string) => <Breadcrumb.Item>{t('MENU.POSTS')}</Breadcrumb.Item>
};

function getTableColumn(t: (key: string) => string): TableColumnsType<Post> {
  return [
    {
      width: '0px',
      render: (_, { id }: Post) => {
        return (
          <Link to={`${id}/edit`}>
            <EditOutlined />
          </Link>
        );
      }
    },
    {
      title: t(LabelConstant.NAME),
      render: (_, { user }: Post) => {
        return <Link to={`/dashboard/users/${user.id}/detail`}>{user.name}</Link>;
      }
    },
    {
      title: t(LabelConstant.TITLE),
      dataIndex: ['title']
    },
    {
      title: t(LabelConstant.BODY),
      dataIndex: ['body']
    },
    {
      title: t(LabelConstant.CREATED_AT),
      render: (_, { created_at }: Post) => {
        return <>{formatDate(new Date(created_at), 'dd MMM yyyy, HH:mm:ss')}</>;
      }
    },
    {
      title: t(LabelConstant.UPDATED_AT),
      render: (_, { updated_at }: Post) => {
        return <>{formatDate(new Date(updated_at), 'dd MMM yyyy, HH:mm:ss')}</>;
      }
    }
  ];
}

const PostPage: React.FC = () => {
  const [filters, setFilters] = useState<PostFilter>(() => ({
    page: 1,
    limit: 10,
    q: undefined!
  }));
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const posts = usePostsQuery(filters);
  const deleteMutation = useDeletePostMutation({
    async onSuccess(response) {
      notification.success({
        message: <strong>{t(LabelConstant.SUCCESS)}</strong>,
        description: (
          <>
            <div>
              Success deleted <strong>{response.data.success.length}</strong> data
            </div>
            {response.data.failed.length > 0 && (
              <div>
                Failed deleted <strong>{response.data.failed.length}</strong> data
              </div>
            )}
          </>
        )
      });
      await queryClient.invalidateQueries(['posts']);
      setSelectedRowKeys([]);
    }
  });

  const isLoading = posts.isLoading || deleteMutation.isLoading;

  function handleFiltersChange(payload: Partial<PostFilter>) {
    setFilters((prevFilters) => ({ ...prevFilters, page: 1, ...payload }));
  }

  function handleChangePagination(page: number, pageSize?: number) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page,
      limit: pageSize || prevFilters.limit
    }));
  }

  function handleDelete() {
    Modal.info({
      title: t(LabelConstant.CONFIRMATION),
      content: <div>{t(LabelConstant.ARE_YOU_SURE_CONFIRMATION)}</div>,
      okCancel: true,
      cancelText: t(LabelConstant.CANCEL),
      okText: t(LabelConstant.OK),
      onOk() {
        deleteMutation.mutate(selectedRowKeys as string[]);
      }
    });
  }

  const rowSelection = {
    selectedRowKeys,
    preserveSelectedRowKeys: true,
    onChange(newSelectedRowKeys: React.Key[]) {
      setSelectedRowKeys(newSelectedRowKeys);
    }
  };
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
          <PostHeaderFilter
            disableDeleteButton={selectedRowKeys.length === 0}
            isLoading={isLoading}
            filters={{ searchTerm: filters.q }}
            onFiltersChange={handleFiltersChange}
            onDelete={handleDelete}
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
              rowSelection={rowSelection}
              pagination={pagination}
            />
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export { PostPage };
export default PostPage;
