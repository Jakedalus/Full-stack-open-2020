import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

function AnecdoteForm() {
	const dispatch = useDispatch();

	const handleCreateAnecdote = e => {
		e.preventDefault();
		console.log('e.target', e.target);
		const anecdote = document.getElementById('new-anecdote')
			.value;
		document.getElementById('new-anecdote').value = '';
		console.log('anecdote', anecdote);
		dispatch(createAnecdote(anecdote));
	};

	return (
		<form>
			<h2>create new</h2>
			<div>
				<input id='new-anecdote' />
			</div>
			<button onClick={handleCreateAnecdote}>create</button>
		</form>
	);
}

export default AnecdoteForm;
