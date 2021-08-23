import React from 'react';

import { ProjectListScreen } from './screens/projectList';
import LoginScreen from './screens/login';
import ChapterTest from './screens/chapter-test';

import logo from './logo.svg';
import './App.css';

function App() {
	return (
		<div className='App'>
			{/* <ProjectListScreen /> */}
			{/* <ChapterTest /> */}
			<LoginScreen />
		</div>
	);
}

export default App;
