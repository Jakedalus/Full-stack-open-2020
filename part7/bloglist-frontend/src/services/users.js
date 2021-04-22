import axios from 'axios';
const baseUrl = '/api/users';

const getAll = async () => {
	console.log('getAll, users');
	const response = await axios.get(baseUrl);

	console.log(`response`, response);

	return response.data;
};

export default {
	getAll
};
