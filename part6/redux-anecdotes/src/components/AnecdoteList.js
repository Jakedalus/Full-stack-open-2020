import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { upvote } from '../reducers/anecdoteReducer';

function AnecdoteList() {
	const anecdotes = useSelector(state => state).sort(
		(a, b) => a.votes < b.votes
	);
	const dispatch = useDispatch();

	console.log('anecdotes', anecdotes);

	const handleVote = id => {
		console.log('vote', id);
		dispatch({ type: 'UPVOTE', data: { id } });
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
		</div>
	);
}

export default AnecdoteList;
