import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './auth-context';

export const AppProviders = ({ children }: { children: ReactNode }) => {
	console.log('AppProviders', children);

	return (
		<QueryClientProvider client={new QueryClient()}>
			<AuthProvider>{children}</AuthProvider>;
		</QueryClientProvider>
	);
};
