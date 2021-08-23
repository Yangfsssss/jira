import React from 'react';
import { useEffect, useState } from 'react';
import * as qs from 'qs';
import { List } from './list';
import { SearchPanel } from './search-panel';

import { cleanObject, useDebounce } from '../../util';

//使用JS时，大部分的错误是在运行时被发现的
//我们希望，在静态代码中，就能找到其中的一些错误 ->强类型
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
	const [param, setParam] = useState({
		name: '',
		personId: '',
	});

	const [users, setUsers] = useState([]);

	const [list, setList] = useState([]);

	const debouncedParam = useDebounce(param,500);

	useEffect(() => {
		fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async (res) => {
			if (res.ok) {
				setList(await res.json());
			}
		});
	}, [debouncedParam]);

	useEffect(() => {
		fetch(`${apiUrl}/users`).then(async (res) => {
			if (res.ok) {
				setUsers(await res.json());
			}
		});
	}, []);

	return (
		<div>
			<SearchPanel param={param} users={users} setParam={setParam}></SearchPanel>
			<List list={list} users={users}></List>
		</div>
	);
};
