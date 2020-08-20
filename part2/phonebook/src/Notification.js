import React from 'react';

const styles = {
	backgroundColor : 'lightgray',
	color           : 'green',
	border          : '3px solid green',
	borderRadius    : 5,
	fontSize        : 26,
	padding         : 10
};

const Notification = ({ message }) => {
	if (message === null) return null;
	return <div style={styles}>{message}</div>;
};

export default Notification;
