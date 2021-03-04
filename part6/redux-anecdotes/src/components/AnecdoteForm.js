import React from 'react';
import { connect } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

function AnecdoteForm({ createAnecdote, setNotification }) {
	// const dispatch = useDispatch();

	const handleCreateAnecdote = async e => {
		e.preventDefault();
		console.log('e.target', e.target);
		const anecdote = document.getElementById('new-anecdote')
			.value;
		document.getElementById('new-anecdote').value = '';
		console.log('anecdote', anecdote);

		createAnecdote(anecdote);

		// displayNotification(
		// 	`Created new anecdote: ${anecdote}`,
		// 	dispatch
		// );

		setNotification(
			`Created new anecdote: ${anecdote}`,
			5000
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

const mapDispatchToProps = {
	createAnecdote,
	setNotification
};

export default connect(null, mapDispatchToProps)(
	AnecdoteForm
);
