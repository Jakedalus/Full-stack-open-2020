import {
	createNotification,
	clearNotification
} from '../reducers/notificationReducer';

export const displayNotification = (
	notification,
	dispatch
) => {
	dispatch(
		createNotification(
			`Created new anecdote ${notification}`
		)
	);
	setTimeout(() => {
		dispatch(clearNotification());
	}, 5000);
};
