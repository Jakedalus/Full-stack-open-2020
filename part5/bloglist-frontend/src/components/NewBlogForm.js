import React, { useState } from 'react';
import blogService from '../services/blogs';

const NewBlogForm = ({
	title,
	setTitle,
	author,
	setAuthor,
	url,
	setUrl,
	handleCreateBlog,
	setCreateBlogFormVisible
}) => {
	return (
		<form
			className='new-blog-form'
			onSubmit={handleCreateBlog}
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
