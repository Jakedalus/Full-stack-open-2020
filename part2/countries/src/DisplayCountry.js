import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const WeatherDescription = styled.li`
	display: flex;
	flex-direction: column;

	p {
		padding-left: 25px;
	}

	img {
		height: 100px;
		width: 100px;
	}
`;

const DisplayCountry = ({ country }) => {
	const [ weather, setWeather ] = useState('');

	// console.log('country:', country);

	useEffect(
		() => {
			axios
				.get(
					`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
						country.capital
					)}&units=imperial&appid=${process.env
						.REACT_APP_OPEN_WEATHER_API_KEY}`
				)
				.then(response => {
					console.log('response:', response);
					setWeather(response.data);
				})
				.catch(err => {
					console.log('err:', err);
				});
		},
		[ country.name ]
	);

	console.log('weather:', weather);

	return (
		<div>
			<h2>{country.name}</h2>
			<p>Capital: {country.capital}</p>
			<p>Population: {country.population}</p>
			<p>Languages:</p>
			<ul>
				{country.languages.map(language => (
					<li key={language.name}>{language.name}</li>
				))}
			</ul>
			<img
				src={country.flag}
				alt={`${country.name}'s flag`}
				width='350px'
			/>
			{weather && (
				<div>
					<h3>Weather at {country.capital}</h3>
					<p>Temperature:{weather.main.temp}</p>
					<p>Feels Like:{weather.main.feels_like}</p>
					<p>Current conditions:</p>
					<ul style={{ padding: '0' }}>
						{weather.weather.map(w => (
							<WeatherDescription key={w.description}>
								<p>{w.description}</p>{' '}
								<img
									src={`http://openweathermap.org/img/wn/${w.icon}@2x.png`}
								/>
							</WeatherDescription>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default DisplayCountry;
