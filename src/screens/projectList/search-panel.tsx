import { Input, Select } from 'antd';
import React from 'react';
import { useEffect, useState } from 'react';

export interface User {
	id: string;
	name: string;
	email: string;
	titles: string;
	organization: string;
	token: string;
}

interface SearchPanelProps {
	users: User[];
	param: {
		name: string;
		personId: string;
	};
	setParam: (param: SearchPanelProps['param']) => void;
}

export const SearchPanel = (props: SearchPanelProps) => {
	const { param, users, setParam } = props;

	return (
		<form action=''>
			<Input type='text' value={param.name} onChange={(evt) => setParam({ ...param, name: evt.target.value })} />

			<Select value={param.personId} onChange={(value) => setParam({ ...param, personId: value })}>
				<Select.Option value=''>负责人</Select.Option>
				{users.map((user) => (
					<Select.Option value={user.id} key={user.id}>
						{user.name}
					</Select.Option>
				))}
			</Select>
		</form>
	);
};
