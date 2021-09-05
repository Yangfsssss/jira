import React from 'react';
import './App.css';
import AuthenticatedApp from './authenticated-app';
import { ExponentCalculator } from './components/exponentCalculator';
import { useAuth } from './context/auth-context';
import UnauthenticatedApp from './unauthenticated-app';

function App() {
	const { user } = useAuth();

	return <div className='App'>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>;
	// return (
	// 	<div>
	// 		<ExponentCalculator />
	// 	</div>
	// );
}
export default App;
