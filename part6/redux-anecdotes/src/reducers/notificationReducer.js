const testNotification = 'test notification';

export const createNotification = notification => {
	return {
		type : 'NEW_NOTIFICATION',
		data : notification
	};
};

const reducer = (state = testNotification, action) => {
	console.log('state now:', state);
	console.log('action', action);

	switch (action.type) {
		case 'NEW_NOTIFICATION':
			return action.notification;
		default:
			return state;
	}
};

export default reducer;
