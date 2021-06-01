import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
	display: flex;
	flex-direction: column;

	padding: 10px;
	margin-top: 15px;
	border: 3px solid black;
	border-radius: 5px;
	background-color: aqua;

	ul {
		margin-top: 10px;
	}

	li {
		margin-left: 20px;
	}

	form button {
		margin-left: 10px;
	}
`;

const UserPage = ({ user }) => {
	// console.log(`users`, users);
	// const id = useParams().id;
	// console.log(`id`, id);

	// const user = users.find(user => {
	// 	console.log(`user.id`, user.id);
	// 	console.log(`id`, id);
	// 	console.log('user.id === id', user.id === id);
	// 	return user.id === id;
	// });
	console.log(`user`, user);
	return (
		<div>
			<h2>User</h2>
			{user && (
				<StyledDiv>
					<p>{user.name}</p>
					<p>{user.username}</p>
					<ul>
						{user.blogs.map(blog => <li>{blog.title}</li>)}
					</ul>
				</StyledDiv>
			)}
		</div>
	);
};

export default UserPage;
