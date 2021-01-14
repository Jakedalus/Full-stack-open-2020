import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

// "username": "sample_username99",
// "password": "samplesample"

const App = () => {
	const [ blogs, setBlogs ] = useState([]);
	const [ errorMessage, setErrorMessage ] = useState(null);
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ user, setUser ] = useState(null);

	useEffect(() => {
		blogService.getAll().then(blogs => setBlogs(blogs));
	}, []);

	const handleLogin = async e => {
		e.preventDefault();
		console.log('logging in with: ', username, password);
		try {
			const user = await loginService.login({
				username,
				password
			});
			setUser(user);
			setUsername('');
			setPassword('');

			console.log('user', user);
		} catch (exception) {
			console.log('exception', exception);
			setErrorMessage('Wrong credentials');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	return (
		<div>
			<h1>Blogs</h1>
			{/* <Notification message={errorMessage} /> */}
			<div>{errorMessage}</div>
			{user === null ? (
				<LoginForm
					username={username}
					password={password}
					setUsername={setUsername}
					setPassword={setPassword}
					handleLogin={handleLogin}
				/>
			) : (
				<div>
					<h2>{user.name} is logged in</h2>
					{blogs.map(blog => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</div>
	);
};

export default App;
