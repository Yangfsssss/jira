import { Button, Card, Divider, Typography } from 'antd';
import React, { useState } from 'react';
import styled from '@emotion/styled';

import LoginScreen from './login';
import RegisterScreen from './register';

import logo from '../assets/logo.svg';
import left from '../assets/left.svg';
import right from '../assets/right.svg';
// import Helmet from 'react-helmet';
import { useDocumentTitle } from '../utils';

const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useDocumentTitle('请登录或注册以继续');

  return (
    <Container>
      <Header />

      <Background />

      <ShadowCard>
        <Title>{isRegister ? '请注册' : '请登录'}</Title>
        {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
        {isRegister ? <RegisterScreen onError={setError} /> : <LoginScreen onError={setError} />}
        <Divider />
        <Button type="link" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? '已经有账号了？直接登陆' : '没有账号？注册新账号'}
        </Button>
      </ShadowCard>
    </Container>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  //背景不随页面一起滚动
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem), calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.4rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  min-height: 100vh;
`;

export default UnauthenticatedApp;
