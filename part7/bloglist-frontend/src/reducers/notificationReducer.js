// const testNotification = 'test notification';

export const setNotification = (notification, time) => {
	console.log(
		'setNotification, notification, time',
		notification,
		time
	);
	return dispatch => {
		const timerId = setTimeout(() => {
			dispatch(clearNotification());
		}, time);

		dispatch(createNotification(notification, timerId));
	};
};

export const createNotification = (
	notification,
	timerId
) => {
	return {
		type         : 'NEW_NOTIFICATION',
		notification,
		timerId
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
		case 'NEW_NOTIFICATION': {
			console.log(
				'state.notification, action.notification',
				state.notification,
				action.notification
			);
			console.log(
				'clearing last notification!!',
				state.notification &&
					state.notification !== action.notification
			);

			if (
				state.notification &&
				state.notification !== action.notification
			) {
				clearTimeout(state.timerId);
			}

			return action;
		}
		case 'CLEAR_NOTIFICATION':
			return '';
		default:
			return state;
	}
};

export default reducer;
