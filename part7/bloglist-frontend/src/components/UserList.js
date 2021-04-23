import React, {
	useState,
	useEffect,
	useLayoutEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserList = ({ users }) => {
	console.log(`users`, users);
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
								<Link to={`/users/${user.id}`}>
									{user.username} - {user.name}
								</Link>
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
