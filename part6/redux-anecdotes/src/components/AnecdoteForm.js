import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import {
	createNotification,
	clearNotification
} from '../reducers/notificationReducer';

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

		dispatch(
			createNotification(`Created new anecdote ${anecdote}`)
		);
		setTimeout(() => {
			dispatch(clearNotification());
		}, 5000);
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
