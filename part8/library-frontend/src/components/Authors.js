import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
	ALL_AUTHORS,
	EDIT_AUTHOR
} from '../queries/queries';

const Authors = ({ show, authors }) => {
	const [ name, setName ] = useState('');
	const [ born, setBorn ] = useState('');

	const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
		refetchQueries : [ { query: ALL_AUTHORS } ],
		onError        : error => {
			console.log(error);
		}
	});

	if (!show) {
		return null;
	}

	const submit = e => {
		e.preventDefault();

		editAuthor({ variables: { name, born } });

		setName('');
		setBorn('');
	};

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th />
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map(a => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<form onSubmit={submit}>
				<input
					type='text'
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<input
					type='number'
					value={born}
					onChange={e => setBorn(+e.target.value)}
				/>
				<button>edit number</button>
			</form>
		</div>
	);
};

export default Authors;
