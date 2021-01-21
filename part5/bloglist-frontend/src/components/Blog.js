import React, { useState } from 'react';
const Blog = ({ blog }) => {
	const [ showDetails, setShowDetails ] = useState(false);
	// console.log('blog', blog);
	return (
		<div className='blog-listing'>
			{blog.title} {blog.author}
			<button onClick={() => setShowDetails(!showDetails)}>
				{showDetails ? 'hide' : 'view'}
			</button>
			{showDetails && (
				<div className='blog-listing--details'>
					<p>{blog.url}</p>
					<p>
						{blog.likes} <button>Like</button>
					</p>
					<p>created by {blog.user.name}</p>
				</div>
			)}
		</div>
	);
};

export default Blog;
