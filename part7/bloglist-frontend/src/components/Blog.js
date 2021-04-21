import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

const Blog = ({
	blog,
	editBlog,
	deleteBlog,
	currentUser
}) => {
	const [ showDetails, setShowDetails ] = useState(false);

	const dispatch = useDispatch();

	// console.log('blog', blog);
	// console.log('currentUser', currentUser);

	const { title, author, url, likes, id, user } = blog;

	const handleAddLike = () => {
		console.log(
			'handleAddLike',
			title,
			author,
			url,
			id,
			user,
			likes
		);
		dispatch(
			editBlog(id, {
				title,
				author,
				url,
				id,
				user,
				likes  : likes + 1,
				type   : 'add-like'
			})
		);
	};

	const handleClickDelete = () => {
		console.log('deleting!');
		deleteBlog(id, title, author);
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
					<p id='likes'>
						{likes}{' '}
						<button onClick={handleAddLike}>like</button>
					</p>
					<p>created by {user.name}</p>
					{currentUser.id === user.id && (
						<button id='delete' onClick={handleClickDelete}>
							delete
						</button>
					)}
				</div>
			)}
		</div>
	);
};

Blog.propTypes = {
	blog        : PropTypes.object.isRequired,
	editBlog    : PropTypes.func.isRequired,
	deleteBlog  : PropTypes.func.isRequired,
	currentUser : PropTypes.object
};

export default Blog;
