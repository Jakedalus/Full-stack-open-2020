import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addComment } from '../reducers/blogReducer';

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

const BlogPage = ({ blog }) => {
	console.log(`blog`, blog);

	const dispatch = useDispatch();

	const [ comment, setComment ] = useState('');

	const handleAddComment = e => {
		e.preventDefault();

		console.log(`comment`, comment);

		dispatch(addComment(blog.id, comment));
		setComment('');
	};

	return (
		<div>
			{blog && (
				<StyledDiv>
					<h2>{blog.title}</h2>
					<p>by {blog.author}</p>
					<a href={`https://${blog.url}`}>{blog.url}</a>
					<p>{blog.likes} likes</p>

					<p>Created by user: {blog.user.name}</p>

					<h3>comments</h3>
					<form onSubmit={handleAddComment}>
						<input
							name='comment'
							id='comment'
							value={comment}
							onChange={e => setComment(e.target.value)}
							type='text'
						/>
						<button>add comment</button>
					</form>
					{blog.comments.length > 0 && (
						<ul>
							{blog.comments.map((comment, index) => (
								<li key={`${comment} + ${index}`}>
									{comment}
								</li>
							))}
						</ul>
					)}
					{blog.comments.length === 0 && (
						<div>no comments...</div>
					)}
				</StyledDiv>
			)}
		</div>
	);
};

export default BlogPage;
