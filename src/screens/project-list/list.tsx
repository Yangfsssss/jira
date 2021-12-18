import { Table } from 'antd';
import type { TableProps } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { User } from './search-panel';
//react-router 和 react-router-dom的关系类似于react 和react-dom/react-native/react-vr...
//react负责生产中转数据供不同环境的实现层消费
import { Link } from 'react-router-dom';

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = (props: ListProps) => {
  const { users, ...others } = props;

  return (
    <Table
      pagination={false}
      columns={[
        {
          title: '名称',
          // dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render: (value, project) => {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        { title: '部门', dataIndex: 'organization' },
        {
          title: '负责人',
          render: (value, project) => (
            <span> {users.find((user) => user.id === project.personId)?.name || '未知'}</span>
          ),
        },
        {
          title: '创建时间',
          dataIndex: 'created',
          render: (value, project) => (
            <span> {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}</span>
          ),
        },
      ]}
      {...others}
    />
  );

  // return (
  // 	<table>
  // 		<thead>
  // 			<tr>
  // 				<th>名称</th>
  // 				<th>负责人</th>
  // 			</tr>
  // 		</thead>
  // 		<tbody>
  // 			{list.map((project) => (
  // 				<tr key={project.id}>
  // 					<td>{project.name}</td>
  // 					<td>{users.find((user) => user.id === project.personId)?.name || '未知'}</td>
  // 				</tr>
  // 			))}
  // 		</tbody>
  // 	</table>
  // );
};
