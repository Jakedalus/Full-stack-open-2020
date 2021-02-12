import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
	const anecdotes = useSelector(state => state).sort(
		(a, b) => a.likes > b.likes
	);
	const dispatch = useDispatch();

	const vote = id => {
		console.log('vote', id);
		dispatch({ type: 'UPVOTE', data: { id } });
	};

	const createAnecdote = e => {
		e.preventDefault();
		console.log('e.target', e.target);
		const anecdote = document.getElementById('new-anecdote')
			.value;
		document.getElementById('new-anecdote').value = '';
		console.log('anecdote', anecdote);
		dispatch({
			type : 'NEW_ANECDOTE',
			data : {
				content : anecdote,
				votes   : 0
			}
		});
	};

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.map(anecdote => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>
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
				<button onClick={createAnecdote}>create</button>
			</form>
		</div>
	);
};

export default App;
