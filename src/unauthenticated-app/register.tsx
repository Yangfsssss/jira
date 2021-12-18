import { Form, Input } from 'antd';
import React from 'react';
import { LongButton } from '.';
import { useAuth } from '../context/auth-context';
import { useAsync } from '../util/use-async';

const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth();

  const { isLoading, run } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async ({ cpassword, ...values }: { cpassword: string; username: string; password: string }) => {
    // e.preventDefault();
    // const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    // const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    if (cpassword !== values.password) {
      return onError(new Error('请确认两次输入的密码相同'));
    }

    try {
      await run(register(values));
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

        <Form.Item name="cpassword" rules={[{ required: true, message: '请确认密码' }]}>
          <Input placeholder={'确认密码'} type="cpassword" id="cpassword" />
        </Form.Item>

        <Form.Item>
          <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>
            注册
          </LongButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterScreen;
