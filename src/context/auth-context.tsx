import React, { ReactNode, useState } from 'react';
import * as auth from '../auth-provider';
import { FullPageErrorFallBack, FullPageLoading } from '../components/lib';
import { User } from '../screens/projectList/search-panel';
import { useMount } from '../util';
import { http } from '../util/http';
import { useAsync } from '../util/use-async';

interface AuthForm {
	username: string;
	password: string;
}

const bootstrapUser = async () => {
	let user = null;

	const token = auth.getToken();

	if (token) {
		const data = await http('me', { token });
		user = data.user;
	}

	return user;
};

const AuthContext = React.createContext<
	| {
			user: User | null;
			register: (form: AuthForm) => Promise<void>;
			login: (form: AuthForm) => Promise<void>;
			logout: () => Promise<void>;
	  }
	| undefined
>(undefined);

AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { data: user, error, isLoading, isIdle, isError, run, setData: setUser } = useAsync<User | null>();

	const login = (form: AuthForm) => auth.login(form).then(setUser);
	const register = (form: AuthForm) => auth.register(form).then(setUser);
	const logout = () => auth.logout().then(() => setUser(null));

	useMount(() => {
		run(bootstrapUser());
	});

	if (isIdle || isLoading) {
		return <FullPageLoading />;
	}

	if (isError) {
		return <FullPageErrorFallBack error={error} />;
	}

	return <AuthContext.Provider value={{ user, login, register, logout }}> {children} </AuthContext.Provider>;
};

export const useAuth = () => {
	const context = React.useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth必须在AuthProvider中使用');
	}

	return context;
};
