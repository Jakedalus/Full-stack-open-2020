import React from 'react';

const BlogPage = ({ blog }) => {
	console.log(`blog`, blog);
	return (
		<div>
			{blog && (
				<div>
					<h2>{blog.title}</h2>
					<p>by {blog.author}</p>
					<a href={`https://${blog.url}`}>{blog.url}</a>
					<p>{blog.likes} likes</p>

					<p>Created by user: {blog.user.name}</p>
				</div>
			)}
		</div>
	);
};

export default BlogPage;
