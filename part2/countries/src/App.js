import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayCountry from './DisplayCountry';

function App() {
	const [ search, setSearch ] = useState('');
	const [ countries, setCountries ] = useState([]);
	const [ showCountry, setShowCountry ] = useState('');

	useEffect(() => {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				setCountries(response.data);
			});
	}, []);

	function handleChange(event) {
		setSearch(event.target.value);
	}

	function handleShow(country) {
		setShowCountry(country);
	}

	const results = countries.filter(country =>
		country.name
			.toLowerCase()
			.includes(search.toLowerCase())
	);

	console.log(results);

	return (
		<div className='App'>
			<label htmlFor='search'>find countries</label>
			<input
				onChange={handleChange}
				type='text'
				name='search'
				value={search}
			/>
			{results.length <= 10 &&
			results.length > 1 && (
				<ul id='countries'>
					{results.map(country => (
						<li>
							{country.name}
							<button onClick={() => handleShow(country)}>
								show
							</button>
						</li>
					))}
				</ul>
			)}

			{(results.length === 1 || showCountry) && (
				<DisplayCountry
					country={
						results.length === 1 ? results[0] : showCountry
					}
				/>
			)}
		</div>
	);
}

export default App;
