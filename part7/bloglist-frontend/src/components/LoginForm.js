import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/userReducer';

const LoginForm = () => {
	const dispatch = useDispatch();

	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	const handleLogin = async e => {
		e.preventDefault();
		console.log('logging in with: ', username, password);
		dispatch(loginUser({ username, password }));
		// try {
		// 	const user = await loginService.login({
		// 		username,
		// 		password
		// 	});

		// 	window.localStorage.setItem(
		// 		'loggedInUser',
		// 		JSON.stringify(user)
		// 	);

		// 	setUser(user);
		// 	setUsername('');
		// 	setPassword('');

		// 	console.log('user', user);
		// } catch (exception) {
		// 	console.log('exception', exception);
		// 	displayNotification({
		// 		message : 'Wrong credentials',
		// 		type    : 'error'
		// 	});
		// }
	};

	return (
		<form onSubmit={handleLogin}>
			<h2>Login to Application</h2>
			<input
				type='text'
				placeholder='username'
				value={username}
				name='Username'
				id='username'
				onChange={({ target }) => setUsername(target.value)}
			/>
			<input
				type='password'
				placeholder='password'
				value={password}
				name='Password'
				id='password'
				onChange={({ target }) => setPassword(target.value)}
			/>
			<button id='login-button'>login</button>
		</form>
	);
};

export default LoginForm;
