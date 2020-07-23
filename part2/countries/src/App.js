import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	const [ search, setSearch ] = useState('');
	const [ countries, setCountries ] = useState([]);

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
					{results.map(country => <li>{country.name}</li>)}
				</ul>
			)}

			{results.length === 1 && (
				<div>
					<h2>{results[0].name}</h2>
					<p>Capital: {results[0].capital}</p>
					<p>Population: {results[0].population}</p>
					<p>Languages:</p>
					<ul>
						{results[0].languages.map(language => (
							<li>{language.name}</li>
						))}
					</ul>
					<img
						src={results[0].flag}
						alt={`${results[0].name}'s flag`}
						width='350px'
					/>
				</div>
			)}
		</div>
	);
}

export default App;
