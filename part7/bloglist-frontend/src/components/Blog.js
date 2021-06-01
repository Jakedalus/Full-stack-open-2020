import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 350px;
	margin: 10px 0;
	padding: 5px;
	border: 3px solid black;
	border-radius: 5px;
`;

const Blog = ({ blog, addLike, deleteBlog }) => {
	const [ showDetails, setShowDetails ] = useState(false);

	const dispatch = useDispatch();

	const currentUser = useSelector(state => state.user);

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
			addLike(id, {
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

	// console.log(
	// 	'Blog, currentUser and blog post user',
	// 	currentUser,
	// 	user.id
	// );

	return (
		<StyledDiv
			className='blog-listing'
			showDetails={showDetails}
		>
			<Link to={`/blogs/${blog.id}`}>
				{title} by {author}
			</Link>
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
		</StyledDiv>
	);
};

Blog.propTypes = {
	blog        : PropTypes.object.isRequired,
	addLike     : PropTypes.func.isRequired,
	deleteBlog  : PropTypes.func.isRequired,
	currentUser : PropTypes.object
};

export default Blog;
