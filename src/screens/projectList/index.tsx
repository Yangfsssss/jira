import styled from '@emotion/styled';
import { Typography } from 'antd';
import React, { useState } from 'react';
// import { Helmet } from 'react-helmet';
import { useDebounce, useDocumentTitle } from '../../util';
import { useProject } from '../../util/project';
import { useUsers } from '../../util/user';
import { List } from './list';
import { SearchPanel } from './search-panel';

//使用JS时，大部分的错误是在运行时被发现的
//我们希望，在静态代码中，就能找到其中的一些错误 ->强类型

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  });
  const debouncedParam = useDebounce(param, 500);

  const { isLoading, error, data: list } = useProject(debouncedParam);
  const { data: users } = useUsers();

  useDocumentTitle('项目列表');

  return (
    <Container>
      {/* <Helmet>
        <title>项目列表</title>
      </Helmet> */}
      <h1>项目列表</h1>
      <SearchPanel param={param} users={users || []} setParam={setParam}></SearchPanel>

      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}

      <List loading={isLoading} dataSource={list || []} users={users || []}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
