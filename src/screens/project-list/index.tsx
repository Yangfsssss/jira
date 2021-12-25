import styled from '@emotion/styled';
import { Button, Typography } from 'antd';
import { ButtonNoPadding, ErrorBox, Row } from 'components/lib';
import React from 'react';
// import { Helmet } from 'react-helmet';
import { useDebounce, useDocumentTitle } from '../../util';
import { useProjects } from '../../util/project';
import { useUsers } from '../../util/user';
import { List } from './list';
import { SearchPanel } from './search-panel';
import { useProjectModal, useProjectsSearchParams } from './utils';

//使用JS时，大部分的错误是在运行时被发现的
//我们希望，在静态代码中，就能找到其中的一些错误 ->强类型

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表');

  const { open } = useProjectModal();

  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 500));
  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type="link" onClick={() => open()}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} users={users || []} setParam={setParam}></SearchPanel>

      <ErrorBox error={error} />

      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
