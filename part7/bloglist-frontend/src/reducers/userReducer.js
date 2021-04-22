import jwt from 'jsonwebtoken';
import loginService from '../services/login';
import { setNotification } from './notificationReducer';

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

			const decodedToken = jwt.verify(
				user.token,
				process.env.REACT_APP_SECRET
			);

			// dispatch({
			// 	type : 'LOGIN',
			// 	data : user
			// });

			dispatch(login({ ...user, id: decodedToken.id }));
		} catch (exception) {
			console.log('exception', exception);
			dispatch(
				setNotification(
					{
						message : 'Wrong credentials',
						type    : 'error'
					},
					5000
				)
			);
			// dispatch({
			// 	type : 'NEW_NOTIFICATION',
			// 	notification : {
			// 		message : 'Wrong credentials',
			// 		type    : 'error'
			// 	}
			// });
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
