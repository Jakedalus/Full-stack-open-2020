import loginService from '../services/login';

export const loginUser = credentials => {
	console.log('loginUser', credentials);

	return async dispatch => {
		console.log('logging user in...');
		const user = await loginService.login(credentials);

		console.log(`loginUser, user`, user);

		dispatch({
			type : 'LOGIN',
			data : user
		});
	};
};

const reducer = (state = [], action) => {
	console.log('state now: ', state);
	console.log('action', action);

	switch (action.type) {
		case 'LOGIN':
			return action.data;
		default:
			return state;
	}
};

export default reducer;
