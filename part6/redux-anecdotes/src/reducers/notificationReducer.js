// const testNotification = 'test notification';

export const setNotification = (notification, time) => {
	console.log(
		'setNotification, notification, time',
		notification,
		time
	);
	return dispatch => {
		dispatch(createNotification(notification));

		setTimeout(() => {
			dispatch(clearNotification());
		}, time);
	};
};

export const createNotification = notification => {
	return {
		type         : 'NEW_NOTIFICATION',
		notification
	};
};

export const clearNotification = () => {
	return {
		type : 'CLEAR_NOTIFICATION'
	};
};

const reducer = (state = '', action) => {
	console.log('state now:', state);
	console.log('action', action);

	switch (action.type) {
		case 'NEW_NOTIFICATION':
			return action.notification;
		case 'CLEAR_NOTIFICATION':
			return '';
		default:
			return state;
	}
};

export default reducer;
