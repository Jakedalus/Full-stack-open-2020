import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { displayNotification } from '../utilities/notification';
import anecdoteService from '../services/anecdotes';

function AnecdoteForm() {
	const dispatch = useDispatch();

	const handleCreateAnecdote = async e => {
		e.preventDefault();
		console.log('e.target', e.target);
		const anecdote = document.getElementById('new-anecdote')
			.value;
		document.getElementById('new-anecdote').value = '';
		console.log('anecdote', anecdote);
		const newAnecdote = await anecdoteService.createNew(
			anecdote
		);
		dispatch(createAnecdote(newAnecdote));

		displayNotification(
			`Created new anecdote: ${anecdote}`,
			dispatch
		);
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
