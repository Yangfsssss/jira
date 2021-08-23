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
			<input type='text' value={param.name} onChange={(evt) => setParam({ ...param, name: evt.target.value })} />

			<select value={param.personId} onChange={(evt) => setParam({ ...param, personId: evt.target.value })}>
				<option label='负责人' value=''></option>
				{users.map((user) => (
					<option value={user.id} key={user.id}>
						{user.name}
					</option>
				))}
			</select>
		</form>
	);
};
