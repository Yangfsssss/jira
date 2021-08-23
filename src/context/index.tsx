import React, { ReactNode } from 'react';
import { AuthProvider } from './auth-context';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  console.log('AppProviders',children);

	return <AuthProvider>{children}</AuthProvider>;
};
