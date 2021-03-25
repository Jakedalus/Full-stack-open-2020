import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const useNotes = url => {
	const [ notes, setNotes ] = useState([]);

	useEffect(
		() => {
			axios.get(url).then(response => {
				setNotes(response.data);
			});
		},
		[ url ]
	);

	return notes;
};

const App = () => {
	const [ counter, setCounter ] = useState(0);
	const [ values, setValues ] = useState([]);
	const url =
		'https://blooming-atoll-75500.herokuapp.com/api/notes';
	const notes = useNotes(url);

	console.log(`notes`, notes);

	const handleClick = () => {
		setCounter(counter + 1);
		setValues(values.concat(counter));
	};

	console.log(`values`, values);

	return (
		<div className='container'>
			hello webpack {counter} clicks
			<button onClick={handleClick}>press</button>
			<div>
				{notes.length} notes on server {url}
			</div>
		</div>
	);
};

export default App;
