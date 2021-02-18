import {
	createNotification,
	clearNotification
} from '../reducers/notificationReducer';

export const displayNotification = (
	notification,
	dispatch
) => {
	dispatch(createNotification(notification));
	setTimeout(() => {
		dispatch(clearNotification());
	}, 5000);
};
