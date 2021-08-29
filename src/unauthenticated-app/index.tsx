import React, { useState } from 'react';

import LoginScreen from './login';
import RegisterScreen from './register';

const UnauthenticatedApp = () => {
	const [isRegister, setIsRegister] = useState(false);

	return (
		<div>
			{isRegister ? <RegisterScreen /> : <LoginScreen />}
			<button onClick={() => setIsRegister(!isRegister)}>切换到{isRegister ? '登陆' : '注册'}</button>
		</div>
	);
};

export default UnauthenticatedApp;
