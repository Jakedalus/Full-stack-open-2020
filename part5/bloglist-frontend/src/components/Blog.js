import React, { useState } from 'react';
const Blog = ({
	blog,
	editBlog,
	deleteBlog,
	currentUser
}) => {
	const [ showDetails, setShowDetails ] = useState(false);

	// console.log('blog', blog);
	// console.log('currentUser', currentUser);

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

	const handleClickDelete = () => {
		console.log('deleting!');
		deleteBlog(id);
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
						<button onClick={handleAddLike}>like</button>
					</p>
					<p>created by {user.name}</p>
					{currentUser.id === user.id && (
						<button onClick={handleClickDelete}>
							delete
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default Blog;
