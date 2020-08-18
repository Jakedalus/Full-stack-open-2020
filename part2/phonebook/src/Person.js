import React from 'react';

const Person = ({ person, deleteNumber }) => (
	<div>
		<p>
			{person.name}, {person.number}
		</p>
		<button onClick={() => deleteNumber(person)}>
			Delete
		</button>
	</div>
);

export default Person;
