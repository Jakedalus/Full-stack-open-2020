import blogService from '../services/blogs';

export const createBlog = data => {
	console.log('createBlog, data', data);

	return async dispatch => {
		console.log('creating blog..');
		const newBlog = await blogService.createNew(data);

		console.log('createBlog, newBlog', newBlog);

		dispatch({
			type : 'NEW_BLOG',
			data : newBlog
		});
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
		case 'INIT_BLOGS':
			return action.data;
		default:
			return state;
	}
};

export default reducer;
