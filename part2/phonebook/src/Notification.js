import React from 'react';

const successStyles = {
	backgroundColor : 'lightgray',
	color           : 'green',
	border          : '3px solid green',
	borderRadius    : 5,
	fontSize        : 26,
	padding         : 10
};

const errorStyles = {
	backgroundColor : 'lightgray',
	color           : 'red',
	border          : '3px solid red',
	borderRadius    : 5,
	fontSize        : 26,
	padding         : 10
};

const Notification = ({ message }) => {
	if (message === null) return null;
	return (
		<div
			style={
				message.type === 'success' ? (
					successStyles
				) : (
					errorStyles
				)
			}
		>
			{message.message}
		</div>
	);
};

export default Notification;
