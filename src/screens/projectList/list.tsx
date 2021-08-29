import { Table } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { User } from './search-panel';

interface Project {
	id: string;
	name: string;
	personId: string;
	pin: boolean;
	organization: string;
	created: number;
}

interface ListProps {
	list: Project[];
	users: User[];
}

export const List = (props: ListProps) => {
	const { list, users } = props;

	return (
		<Table
			pagination={false}
			columns={[
				{ title: '名称', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
				{ title: '部门', dataIndex: 'organization' },
				{ title: '负责人', render: (value, project) => <span> {users.find((user) => user.id === project.personId)?.name || '未知'}</span> },
				{
					title: '创建时间',
					dataIndex: 'created',
					render: (value, project) => <span> {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}</span>,
				},
			]}
			dataSource={list}
		/>
	);

	return (
		<table>
			<thead>
				<tr>
					<th>名称</th>
					<th>负责人</th>
				</tr>
			</thead>
			<tbody>
				{list.map((project) => (
					<tr key={project.id}>
						<td>{project.name}</td>
						<td>{users.find((user) => user.id === project.personId)?.name || '未知'}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
