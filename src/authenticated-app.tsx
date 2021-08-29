import styled from '@emotion/styled';
import React from 'react';
import { useAuth } from './context/auth-context';
import { ProjectListScreen } from './screens/projectList';

/**
 * grid 和 flex 各自的应用场景
 * 1.要考虑，是一维布局，还是二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2.从内容出发还是从布局出发
 * 从内容出发：你先有一组内容（数量一般不固定），然后希望它们均匀地分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格（数量一般比较固定），然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 */

const AuthenticatedApp = () => {
	const { logout } = useAuth();

	return (
		<Container>
			<PageHeader>
				<button onClick={logout}>登出</button>
			</PageHeader>
			<Main>
				<ProjectListScreen />
			</Main>
		</Container>
	);
};

const Container = styled.div`
	display: grid;
	grid-template-rows: 6rem, calc(100vh - 6rem);
`;

const PageHeader = styled.header`
	height: 6rem;
`;

const Main = styled.main`
	height: calc(100vh - 6rem);
`;

export default AuthenticatedApp;
