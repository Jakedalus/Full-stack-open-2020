import React, { useState } from 'react';
const Blog = ({ blog, editBlog }) => {
	const [ showDetails, setShowDetails ] = useState(false);

	// console.log('blog', blog);

	const { title, author, url, likes, id, user } = blog;

	const handleAddLike = () => {
		editBlog(id, {
			title,
			author,
			url,
			id,
			user,
			likes  : likes + 1,
			type   : 'add-like'
		});
	};

	return (
		<div className='blog-listing'>
			{title} {author}
			<button onClick={() => setShowDetails(!showDetails)}>
				{showDetails ? 'hide' : 'view'}
			</button>
			{showDetails && (
				<div className='blog-listing--details'>
					<p>{url}</p>
					<p>
						{likes}{' '}
						<button onClick={handleAddLike}>Like</button>
					</p>
					<p>created by {user.name}</p>
				</div>
			)}
		</div>
	);
};

export default Blog;
