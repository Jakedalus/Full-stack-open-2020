import React, { useState } from 'react';

const BlogPage = ({ blog }) => {
	console.log(`blog`, blog);

	const [ comment, setComment ] = useState('');

	const handleAddComment = e => {
		e.preventDefault();

		console.log(`comment`, comment);
	};

	return (
		<div>
			{blog && (
				<div>
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
							{blog.comments.map(comment => (
								<li>{comment}</li>
							))}
						</ul>
					)}
					{blog.comments.length === 0 && (
						<div>no comments...</div>
					)}
				</div>
			)}
		</div>
	);
};

export default BlogPage;
