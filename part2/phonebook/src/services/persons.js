import axios from 'axios';
// const baseUrl = 'http://localhost:3001/api/persons';
// const baseUrl =
// 	'https://murmuring-hollows-93696.herokuapp.com/api/persons';
const baseUrl = '/api/persons';

const getAll = () => {
	return axios.get(baseUrl).then(response => {
		console.log('getAll:', response);
		return response.data;
	});
};

const getOne = id => {
	return axios.get(`${baseUrl}/${id}`).then(response => {
		console.log('getOne:', response);
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
	getOne,
	createPerson,
	deletePerson,
	updatePerson
};
