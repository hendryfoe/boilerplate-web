import { Button, Card, Col, Form, FormProps, Input, Row } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from 'contexts/auth/use-auth';

const formItemLayout: FormProps = {
  name: 'login-form',
  labelCol: { span: 6 },
  style: { marginTop: '2rem' },
  autoComplete: 'off',
  labelAlign: 'left',
  colon: false,
  requiredMark: false
};

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogin } = useAuth();
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  async function onFinish(values: { email: string; password: string }) {
    setLoading(true);
    await handleLogin(values, () => {
      navigate(from, { replace: true });
    }).catch(() => {});
    setLoading(false);
  }

  return (
    <div style={{ backgroundColor: '#f5f5f6', height: '100vh', paddingTop: '6rem' }}>
      <Row justify="center">
        <Col span={5}>
          <Card>
            <Form {...formItemLayout} onFinish={onFinish}>
              <Form.Item
                label="Email"
                name="email"
                initialValue="admin@admin.com"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Invalid Email Format!' }
                ]}
              >
                <Input disabled={loading} placeholder="Type Email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                initialValue="admintest"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password disabled={loading} placeholder="Type Password" />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 6 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export { Login };
