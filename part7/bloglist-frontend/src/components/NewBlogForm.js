import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';

const NewBlogForm = ({
	setCreateBlogFormVisible,
	displayNotification
}) => {
	const [ title, setTitle ] = useState('');
	const [ author, setAuthor ] = useState('');
	const [ url, setUrl ] = useState('');

	const user = useSelector(state => state.user);

	const dispatch = useDispatch();

	const handleCreateBlog = blogObject => {
		console.log('blogObject:', blogObject);

		const headers = {
			headers : { Authorization: `bearer ${user.token}` }
		};

		console.log('headers:', headers);
		// const newBlog = await blogService.createNew(
		// 	{ title, author, url },
		// 	{ headers: { Authorization: `bearer ${user.token}` } }
		// );

		dispatch(createBlog(blogObject, headers));

		// setBlogs(tempBlogs);

		setCreateBlogFormVisible(false);

		displayNotification({
			message : `a new blog ${blogObject.title} by ${blogObject.author} was created`,
			type    : 'success'
		});
	};

	const handleAddBlog = event => {
		event.preventDefault();
		handleCreateBlog({
			title,
			author,
			url
		});

		setTitle('');
		setAuthor('');
		setUrl('');
	};

	return (
		<form
			className='new-blog-form'
			onSubmit={handleAddBlog}
		>
			<input
				type='text'
				placeholder='title'
				value={title}
				name='Title'
				id='title'
				onChange={({ target }) => setTitle(target.value)}
			/>
			<input
				type='text'
				placeholder='author'
				value={author}
				name='Author'
				id='author'
				onChange={({ target }) => setAuthor(target.value)}
			/>
			<input
				type='text'
				placeholder='url'
				value={url}
				name='URL'
				id='url'
				onChange={({ target }) => setUrl(target.value)}
			/>
			<button type='submit'>create</button>
			<button
				type='button'
				onClick={() => setCreateBlogFormVisible(false)}
			>
				cancel
			</button>
		</form>
	);
};

export default NewBlogForm;
