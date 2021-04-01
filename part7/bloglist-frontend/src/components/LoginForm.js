import React from 'react';
const LoginForm = ({
	username,
	password,
	setUsername,
	setPassword,
	handleLogin
}) => (
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

export default LoginForm;
