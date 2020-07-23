import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	const [ search, setSearch ] = useState('');
	const [ countries, setCountries ] = useState([]);

	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all').then(response => {
			setCountries(response.data);
		});
	}, []);

	function handleChange(event) {
		setSearch(event.target.value);
	}

	const results = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()));

	console.log(results);

	return (
		<div className='App'>
			<label htmlFor='search'>find countries</label>
			<input onChange={handleChange} type='text' name='search' value={search} />
			{results.length <= 10 && <ul id='countries'>{results.map(country => <li>{country.name}</li>)}</ul>}
		</div>
	);
}

export default App;
