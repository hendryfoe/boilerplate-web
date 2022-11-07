import { ArrowLeftOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Breadcrumb, Button, Card, Col, Form, FormProps, Input, notification, Row } from 'antd';

import { LabelConstant } from 'constants/label.constant';
import { Post } from 'models/post.model';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { validateMessages } from 'utils/form-validation-messages.util';
import { useAddOrEditPostMutation } from '../shared/hooks/use-posts.mutation';
import { usePostQuery } from '../shared/hooks/use-posts.query';

export const postFormAddPageRouteHandle = {
  crumb: (t: (key: string) => string) => (
    <>
      <Breadcrumb.Item>
        <Link to="/dashboard/posts">{t('MENU.POSTS')}</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{t('MENU.ADD')}</Breadcrumb.Item>
    </>
  )
};

export const postFormEditPageRouteHandle = {
  crumb: (t: (key: string) => string, params: Record<string, string>) => (
    <>
      <Breadcrumb.Item>
        <Link to="/dashboard/posts">{t('MENU.POSTS')}</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{params.id}</Breadcrumb.Item>
      <Breadcrumb.Item>{t('MENU.EDIT')}</Breadcrumb.Item>
    </>
  )
};

const formItemLayout: FormProps = {
  name: 'post-form',
  labelCol: {
    xs: { span: 24 },
    xl: { span: 3 },
    xxl: { span: 2 }
  },
  wrapperCol: {
    xs: { span: 24 },
    xl: { span: 16 },
    xxl: { span: 10 }
  },
  labelAlign: 'left',
  colon: false,
  requiredMark: false,
  autoComplete: 'off'
};

function PostFormPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const backNavigationLink = '/dashboard/posts';
  const isEdit = params.id != null && params.id !== '';

  const { isFetching } = usePostQuery(params.id!, {
    enabled: isEdit,
    onSuccess({ data }) {
      form.setFieldsValue({ ...data });
    }
  });
  const postMutation = useAddOrEditPostMutation({
    onSuccess: () => {
      notification.success({
        message: <strong>{t(LabelConstant.SUCCESS)}</strong>,
        description: isEdit ? 'Sucess Edit Post' : 'Sucess Add Post'
      });
      queryClient.invalidateQueries(['posts']);

      navigate(backNavigationLink);
    }
  });
  const formLoading = isFetching || postMutation.isLoading;

  function onFinish(values: Partial<Post>) {
    const post = isEdit ? { id: params.id, ...values } : { ...values };
    postMutation.mutate({ isEdit, post });
  }

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
        <Card>
          <Form {...formItemLayout} form={form} onFinish={onFinish} validateMessages={validateMessages(t)}>
            <Form.Item label={t(LabelConstant.TITLE)} name="title" rules={[{ required: true }]}>
              <Input placeholder="Type Title" disabled={formLoading} />
            </Form.Item>

            <Form.Item label={t(LabelConstant.BODY)} name="body" rules={[{ required: true }]}>
              <Input.TextArea allowClear showCount placeholder="Type Body" rows={5} disabled={formLoading} />
            </Form.Item>

            <Form.Item wrapperCol={{ xl: 19, xxl: 12 }} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit" loading={false} disabled={formLoading}>
                {t(LabelConstant.SAVE)}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export { PostFormPage };
export default PostFormPage;
