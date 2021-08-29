import { Button, Form, Input } from 'antd';
import React, { FormEvent } from 'react';
import { LongButton } from '.';
import { useAuth } from '../context/auth-context';

// const apiUrl = process.env.REACT_APP_API_URL;

const RegisterScreen = () => {
	const { register, user } = useAuth();

	const handleSubmit = (values: { username: string; password: string }) => {
		// e.preventDefault();
		// const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
		// const password = (e.currentTarget.elements[1] as HTMLInputElement).value;

		register(values);
	};

	return (
		<div>
			<Form onFinish={handleSubmit}>
				<Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]}>
					<Input placeholder={'用户名'} type='text' id='username' />
				</Form.Item>
				<Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
					<Input placeholder={'密码'} type='password' id='password' />
				</Form.Item>
				<Form.Item>
					<LongButton htmlType={'submit'} type={'primary'}>
						注册
					</LongButton>
				</Form.Item>
			</Form>
		</div>
	);
};

export default RegisterScreen;
