import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';

const App = () => {
	const [ blogs, setBlogs ] = useState([]);
	const [ username, setUsername ] = useState([]);
	const [ password, setPassword ] = useState([]);
	const [ user, setUser ] = useState([]);

	useEffect(() => {
		blogService.getAll().then(blogs => setBlogs(blogs));
	}, []);

	const handleLogin = e => {
		e.preventDefault();
		console.log('logging in with: ', username, password);
	};

	return (
		<div>
			<LoginForm
				username={username}
				password={password}
				setUsername={setUsername}
				setPassword={setPassword}
				handleLogin={handleLogin}
			/>
			<h2>blogs</h2>
			{blogs.map(blog => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default App;
