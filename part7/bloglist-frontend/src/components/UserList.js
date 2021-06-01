import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledTable = styled.table`
	background-color: aqua;
	padding: 10px;
	border: 3px solid black;
	border-radius: 5px;

	th,
	td {
		border: 1px solid black;
		padding: 4px 6px;
	}
`;

const UserList = ({ users }) => {
	console.log(`users`, users);
	return (
		<div>
			<h2>Users</h2>
			<StyledTable>
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
			</StyledTable>
		</div>
	);
};

export default UserList;
