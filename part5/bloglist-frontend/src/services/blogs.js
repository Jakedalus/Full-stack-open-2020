import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
	// const request = axios.get(baseUrl);
	// console.log('getAll, request', request);
	// return request.then(response => {
	// 	console.log('response', response);
	// 	return response.data;
	// });

	const response = await axios.get(baseUrl);

	console.log('getAll, response', response);

	return response.data;
};

const createNew = async (blog, config) => {
	console.log('createNew', blog, config);

	// const request = axios.post(baseUrl, blog, config);
	// return request.then(response => response.data);

	const response = await axios.post(baseUrl, blog, config);

	console.log('createNew, response', response);

	return response.data;
};

const updateBlog = async (id, updates, config) => {
	console.log('updateBlog', id, updates, config);

	const response = await axios.put(
		`${baseUrl}/${id}`,
		updates,
		config
	);

	console.log('updateBlog, response', response);

	return response.data;
};

export default { getAll, createNew, updateBlog };
