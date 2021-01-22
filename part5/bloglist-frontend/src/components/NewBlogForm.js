import React, { useState } from 'react';

const NewBlogForm = ({
	createBlog,
	setCreateBlogFormVisible
}) => {
	const [ title, setTitle ] = useState('');
	const [ author, setAuthor ] = useState('');
	const [ url, setUrl ] = useState('');

	const handleAddBlog = event => {
		event.preventDefault();
		createBlog({
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
				onChange={({ target }) => setTitle(target.value)}
			/>
			<input
				type='text'
				placeholder='author'
				value={author}
				name='Author'
				onChange={({ target }) => setAuthor(target.value)}
			/>
			<input
				type='text'
				placeholder='url'
				value={url}
				name='URL'
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
