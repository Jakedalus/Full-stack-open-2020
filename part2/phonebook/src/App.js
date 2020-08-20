import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import PersonList from './PersonList';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Notification from './Notification';

const App = () => {
	const [ persons, setPersons ] = useState([]);
	const [ newName, setNewName ] = useState('');
	const [ newNumber, setNewNumber ] = useState('');
	const [ search, setSearch ] = useState('');
	const [ message, setMessage ] = useState(null);

	useEffect(() => {
		personService.getAll().then(initialPersons => {
			setPersons(initialPersons);
		});
	}, []);

	const addName = event => {
		// console.log('addName', newName, persons, persons.map(person => person.name).includes(newName));
		event.preventDefault();
		if (newName !== '' && newNumber !== '') {
			if (
				// if person already exists, ask if user wants to Update
				persons.map(person => person.name).includes(newName)
			) {
				// window.alert(
				// 	`${newName} is already added to phonebook`
				// );
				const userWantsToUpdateNumber = window.confirm(
					`${newName} is already added to phonebook. Do you want to replace the old number with a new one?`
				);

				if (userWantsToUpdateNumber) {
					const personToUpdate = persons.find(
						p => p.name === newName
					);
					personService
						.updatePerson({
							...personToUpdate,
							number : newNumber
						})
						.then(updatedPerson => {
							console.log('updatedPerson', updatedPerson);
							setPersons(
								persons
									.filter(p => p.name !== newName)
									.concat(updatedPerson)
							);
							setMessage({
								message : `${updatedPerson.name} was updated`,
								type    : 'success'
							});
							setTimeout(() => {
								setMessage(null);
							}, 5000);
						})
						.catch(error => {
							console.log('Error:', error);
							setMessage({
								message : `${newName} has already been removed from the server`,
								type    : 'error'
							});
							setTimeout(() => {
								setMessage(null);
							}, 5000);
						});
				}
			} else {
				const newPerson = {
					name   : newName,
					number : newNumber
				};

				personService
					.createPerson(newPerson)
					.then(returnedPerson => {
						setPersons(persons.concat(returnedPerson));
						setMessage({
							message : `${returnedPerson.name} was added to the phonebook`,
							type    : 'success'
						});
						setTimeout(() => {
							setMessage(null);
						}, 5000);
					});
			}
			setNewName('');
			setNewNumber('');
		}
	};

	const deleteNumber = person => {
		const userIsSure = window.confirm(
			`Are you sure you want to delete ${person.name}?`
		);

		console.log('deleteNumber', person, userIsSure);

		if (userIsSure) {
			personService.deletePerson(person).then(response => {
				// console.log('Deleted', response);
				setPersons(persons.filter(p => p.id !== person.id));
				setMessage({
					message : `${person.name} was deleted from the phonebook`,
					type    : 'success'
				});
				setTimeout(() => {
					setMessage(null);
				}, 5000);
			});
		}
	};

	const handleNameChange = event => {
		setNewName(event.target.value);
	};

	const handleNumberChange = event => {
		setNewNumber(event.target.value);
	};

	const handleSearch = event => {
		setSearch(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>

			<Notification message={message} />

			<Filter search={search} handleSearch={handleSearch} />

			<PersonForm
				addName={addName}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
			/>

			<PersonList
				search={search}
				persons={persons}
				deleteNumber={deleteNumber}
			/>
		</div>
	);
};

export default App;
