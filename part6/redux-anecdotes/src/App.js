import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	createAnecdote,
	upvote
} from './reducers/anecdoteReducer';

const App = () => {
	const anecdotes = useSelector(state => state).sort(
		(a, b) => a.votes < b.votes
	);
	const dispatch = useDispatch();

	console.log('anecdotes', anecdotes);

	const handleVote = id => {
		console.log('vote', id);
		dispatch({ type: 'UPVOTE', data: { id } });
	};

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
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.map(anecdote => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote.id)}>
							vote
						</button>
					</div>
				</div>
			))}
			<h2>create new</h2>
			<form>
				<div>
					<input id='new-anecdote' />
				</div>
				<button onClick={handleCreateAnecdote}>
					create
				</button>
			</form>
		</div>
	);
};

export default App;
