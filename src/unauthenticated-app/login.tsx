import React from 'react';
import { useAuth } from '../context/auth-context';
import { Form, Input, Typography } from 'antd';
import { LongButton } from '.';
import { useAsync } from '../util/use-async';

const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { login } = useAuth();

  const { isLoading, run } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async (values: { username: string; password: string }) => {
    // e.preventDefault();
    // const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    // const password = (e.currentTarget.elements[1] as HTMLInputElement).value;

    try {
      await run(login(values));
    } catch (e) {
      onError(e);
    }
  };

  return (
    <div>
      <Form onFinish={handleSubmit}>
        {/* {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null} */}

        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder={'用户名'} type="text" id="username" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input placeholder={'密码'} type="password" id="password" />
        </Form.Item>

        <Form.Item>
          <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>
            登录
          </LongButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginScreen;
