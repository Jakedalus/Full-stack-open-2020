import React from 'react';
import { useDispatch } from 'react-redux';
import Blog from './Blog';
import {
	addLike,
	removeBlog
} from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogList = ({ blogs, user }) => {
	const dispatch = useDispatch();

	const deleteBlog = async (id, title, author) => {
		const shouldDeleteBlog = window.confirm(
			`Do you really want to delete ${title} by ${author}?`
		);

		const headers = {
			headers : { Authorization: `bearer ${user.token}` }
		};

		if (shouldDeleteBlog) {
			dispatch(removeBlog(id, headers));
			dispatch(
				setNotification(
					{
						message : `the blog ${title} has been deleted`,
						type    : 'success'
					},
					5000
				)
			);
		}
	};

	return (
		<div id='blog-list'>
			{blogs.map(blog => (
				<Blog
					key={blog.id}
					blog={blog}
					addLike={addLike}
					deleteBlog={deleteBlog}
					currentUser={user}
				/>
			))}
		</div>
	);
};

export default BlogList;
