import React from 'react';

const DisplayCountry = ({ country }) => {
	return (
		<div>
			<h2>{country.name}</h2>
			<p>Capital: {country.capital}</p>
			<p>Population: {country.population}</p>
			<p>Languages:</p>
			<ul>
				{country.languages.map(language => (
					<li>{language.name}</li>
				))}
			</ul>
			<img
				src={country.flag}
				alt={`${country.name}'s flag`}
				width='350px'
			/>
		</div>
	);
};

export default DisplayCountry;
