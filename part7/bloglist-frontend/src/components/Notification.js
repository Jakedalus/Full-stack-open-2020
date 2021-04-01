import React from 'react';

const Notification = ({ notification }) => {
	console.log('notification', notification);
	const { message, type } = notification;
	console.log('message, type', message, type);
	return (
		<div
			className={
				type === 'error' ? (
					'notification error'
				) : (
					'notification success'
				)
			}
		>
			{message}
		</div>
	);
};

export default Notification;
