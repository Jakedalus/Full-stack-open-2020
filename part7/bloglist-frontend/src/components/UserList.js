import React, {
	useState,
	useEffect,
	useLayoutEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../reducers/usersReducer';

const UserList = () => {
	const dispatch = useDispatch();
	const users = useSelector(state => state.users);

	console.log(`users`, users);

	useEffect(
		() => {
			dispatch(getAllUsers());
		},
		[ dispatch ]
	);

	return (
		<div>
			<h2>Users</h2>
			{users.map(user => (
				<div>
					{user.username} - {user.name}
				</div>
			))}
		</div>
	);
};

export default UserList;
