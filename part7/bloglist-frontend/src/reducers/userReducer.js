import loginService from '../services/login';

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

export const login = user => {
	console.log(`login, user`, user);
	return dispatch =>
		dispatch({
			type : 'LOGIN',
			data : user
		});
};

export const logout = () => {
	console.log(`logout`);
	return dispatch =>
		dispatch({
			type : 'LOGOUT'
		});
};

export const loginUser = credentials => {
	console.log('loginUser', credentials);

	return async dispatch => {
		console.log('logging user in...');
		try {
			const user = await loginService.login(credentials);

			console.log(`loginUser, user`, user);

			window.localStorage.setItem(
				'loggedInUser',
				JSON.stringify(user)
			);

			// dispatch({
			// 	type : 'LOGIN',
			// 	data : user
			// });
			dispatch(login(user));
		} catch (exception) {
			console.log('exception', exception);
			dispatch({
				type : 'NEW_NOTIFICATION',
				data : {
					message : 'Wrong credentials',
					type    : 'error'
				}
			});
		}
	};
};

const reducer = (state = [], action) => {
	console.log('state now: ', state);
	console.log('action', action);

	switch (action.type) {
		case 'LOGIN':
			return action.data;
		case 'LOGOUT':
			return [];
		default:
			return state;
	}
};

export default reducer;
