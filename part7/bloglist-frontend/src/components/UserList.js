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
			<table>
				<thead>
					<tr>
						<th />
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<tr>
							<td>
								{user.username} - {user.name}
							</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserList;
