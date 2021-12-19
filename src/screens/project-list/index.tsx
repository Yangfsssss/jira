import styled from '@emotion/styled';
import { Button, Typography } from 'antd';
import { Row } from 'components/lib';
import React from 'react';
// import { Helmet } from 'react-helmet';
import { useDebounce, useDocumentTitle } from '../../util';
import { useProject } from '../../util/project';
import { useUsers } from '../../util/user';
import { List } from './list';
import { SearchPanel } from './search-panel';
import { useProjectsSearchParams } from './utils';

//使用JS时，大部分的错误是在运行时被发现的
//我们希望，在静态代码中，就能找到其中的一些错误 ->强类型

export const ProjectListScreen = (props: { projectButton: JSX.Element }) => {
  useDocumentTitle('项目列表');

  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list, retry } = useProject(useDebounce(param, 500));
  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        {props.projectButton}
      </Row>
      <SearchPanel param={param} users={users || []} setParam={setParam}></SearchPanel>

      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}

      <List
        projectButton={props.projectButton}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
        refresh={retry}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
