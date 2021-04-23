import React from 'react';
import { useParams } from 'react-router-dom';

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
				<div>
					<p>{user.name}</p>
					<p>{user.username}</p>
					<ul>
						{user.blogs.map(blog => <li>{blog.title}</li>)}
					</ul>
				</div>
			)}
		</div>
	);
};

export default UserPage;
