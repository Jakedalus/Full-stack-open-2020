import React from 'react';
const LoginForm = ({
	username,
	password,
	setUsername,
	setPassword,
	handleLogin
}) => (
	<form onSubmit={handleLogin}>
		<input
			type='text'
			placeholder='username'
			value={username}
			name='Username'
			onChange={({ target }) => setUsername(target.value)}
		/>
		<input
			type='password'
			placeholder='password'
			value={password}
			name='Password'
			onChange={({ target }) => setPassword(target.value)}
		/>
		<button>login</button>
	</form>
);

export default LoginForm;
