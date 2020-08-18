import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
	return axios.get(baseUrl).then(response => {
		console.log(response);
		return response.data;
	});
};

const createPerson = newPerson => {
	return axios
		.post(baseUrl, newPerson)
		.then(response => response.data);
};

const deletePerson = person => {
	console.log('deletePerson', person);
	return axios
		.delete(`${baseUrl}/${person.id}`)
		.then(response => response.data);
};

const updatePerson = person => {
	console.log('updatePerson', person);
	return axios
		.put(`${baseUrl}/${person.id}`, person)
		.then(response => response.data);
};

export default {
	getAll,
	createPerson,
	deletePerson,
	updatePerson
};
