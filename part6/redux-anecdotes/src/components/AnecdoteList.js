import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { upvote } from '../reducers/anecdoteReducer';
import { displayNotification } from '../utilities/notification';

function AnecdoteList() {
	const anecdotes = useSelector(
		state => state.anecdotes
	).sort((a, b) => a.votes < b.votes);
	const dispatch = useDispatch();

	console.log('anecdotes', anecdotes);

	const handleVote = ({ id, content }) => {
		console.log('vote', id);
		dispatch(upvote(id));
		displayNotification(
			`Upvoted anecdote: ${content}`,
			dispatch
		);
	};

	return (
		<div>
			{anecdotes.map(anecdote => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>
							vote
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

export default AnecdoteList;
