import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Persons from './Persons';
import PersonForm from './PersonForm';
import PhoneForom from './PhoneForm';
import { ALL_PERSONS } from './queries';

function App() {
	const [ errorMessage, setErrorMessage ] = useState(null);

	const notify = message => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 5000);
	};

	const result = useQuery(ALL_PERSONS, {
		pollInterval : 2000
	});

	if (result.loading) {
		return <div>loading...</div>;
	}

	const Notify = ({ errorMessage }) => {
		if (!errorMessage) {
			return null;
		}
		return (
			<div style={{ color: 'red' }}> {errorMessage} </div>
		);
	};

	return (
		<div className='App'>
			<Notify errorMessage={errorMessage} />
			<PersonForm setError={notify} />
			<Persons persons={result.data.allPersons} />
			<PhoneForom setError={notify} />
		</div>
	);
}

export default App;
