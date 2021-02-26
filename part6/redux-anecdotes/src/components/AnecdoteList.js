import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { upvote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

function AnecdoteList() {
	const filter = useSelector(state => state.filter);
	console.log('filter', filter);

	const anecdotes = useSelector(state => state.anecdotes)
		.filter(anecdote =>
			anecdote.content
				.toLowerCase()
				.includes(filter.toLowerCase())
		)
		.sort((a, b) => a.votes < b.votes);

	const dispatch = useDispatch();

	console.log('anecdotes', anecdotes);

	const handleVote = ({ id, content }) => {
		console.log('vote', id);
		dispatch(upvote(id));
		dispatch(
			setNotification(`Upvoted anecdote: ${content}`, 5000)
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
