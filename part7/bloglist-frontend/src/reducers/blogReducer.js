import blogService from '../services/blogs';

export const createBlog = (data, config) => {
	console.log('createBlog, data', data);
	console.log('createBlog, config', config);

	return async dispatch => {
		console.log('creating blog..');
		const newBlog = await blogService.createNew(
			data,
			config
		);

		console.log('createBlog, newBlog', newBlog);

		dispatch({
			type : 'NEW_BLOG',
			data : newBlog
		});
	};
};

export const addLike = (id, updates) => {
	console.log(`addLike`, id, updates);

	return async dispatch => {
		console.log('editing blog...');
		try {
			const updatedBlog = await blogService.updateBlog(
				id,
				updates
			);

			console.log(`updatedBlog`, updatedBlog);

			dispatch({
				type : 'UPDATE_BLOG',
				data : updatedBlog
			});
		} catch (exception) {
			console.log('exception', exception);
			dispatch({
				type : 'NEW_NOTIFICATION',
				data : {
					message : 'Wrong credentials',
					type    : 'error'
				}
			});
		}
	};
};

export const addComment = (id, comment) => {
	console.log('addComment', id, comment);

	return async dispatch => {
		console.log('adding comment...');

		try {
			const updatedBlog = await blogService.createComment(
				id,
				comment
			);

			console.log(`updatedBlog`, updatedBlog);

			dispatch({
				type : 'UPDATE_BLOG',
				data : updatedBlog
			});
		} catch (exception) {
			console.log('exception', exception);
			dispatch({
				type : 'NEW_NOTIFICATION',
				data : {
					message : 'Wrong credentials',
					type    : 'error'
				}
			});
		}
	};
};

export const removeBlog = (id, config) => {
	console.log(`removeBlog`, id, config);
	return async dispatch => {
		try {
			const deletedBlog = await blogService.deleteBlog(
				id,
				config
			);

			console.log('deletedBlog', deletedBlog);

			dispatch({
				type : 'DELETE_BLOG',
				data : deletedBlog
			});

			// dispatch({
			// 	type : 'NEW_NOTIFICATION',
			// 	data : {
			// 		message : `the blog ${deletedBlog.title} has been deleted`,
			// 		type    : 'success'
			// 	}
			// });
		} catch (e) {
			dispatch({
				type : 'NEW_NOTIFICATION',
				data : {
					message : `failed to delete blog`,
					type    : 'error'
				}
			});
		}
	};
};

export const initializeBlogs = () => {
	console.log('initializeBlogs');

	return async dispatch => {
		console.log('getting blogs...');
		const blogs = await blogService.getAll();

		blogs.sort((a, b) => +b.likes - +a.likes);

		console.log(`initializeBlogs, blogs`, blogs);

		dispatch({
			type : 'INIT_BLOGS',
			data : blogs
		});
	};
};

const reducer = (state = [], action) => {
	console.log('state now: ', state);
	console.log('action', action);

	switch (action.type) {
		case 'NEW_BLOG':
			return [ ...state, { ...action.data } ];
		case 'UPDATE_BLOG':
			return state.map(
				blog =>
					blog.id === action.data.id
						? { ...action.data }
						: blog
			);
		case 'DELETE_BLOG':
			return state.filter(
				blog => blog.id !== action.data.id
			);
		case 'INIT_BLOGS':
			return action.data;
		default:
			return state;
	}
};

export default reducer;
