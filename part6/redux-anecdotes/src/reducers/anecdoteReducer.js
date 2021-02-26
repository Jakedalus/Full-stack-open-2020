import anecdoteService from '../services/anecdotes';

// const anecdotesAtStart = [
// 	'If it hurts, do it more often',
// 	'Adding manpower to a late software project makes it later!',
// 	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
// 	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
// 	'Premature optimization is the root of all evil.',
// 	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = anecdote => {
// 	return {
// 		content : anecdote,
// 		id      : getId(),
// 		votes   : 0
// 	};
// };

// const initialState = anecdotesAtStart.map(asObject);

export const createAnecdote = data => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(
			data
		);

		dispatch({
			type : 'NEW_ANECDOTE',
			data : newAnecdote
		});
	};
};

export const upvote = id => {
	return async dispatch => {
		const anecdoteToUpdate = await anecdoteService.getOne(
			id
		);
		const updatedAnecdote = await anecdoteService.update(
			id,
			{
				...anecdoteToUpdate,
				votes : anecdoteToUpdate.votes + 1
			}
		);

		console.log(
			'upvote, anecdoteReducer, updatedAnecdote:',
			updatedAnecdote
		);

		dispatch({
			type : 'UPVOTE',
			data : { id }
		});
	};
};

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll();

		dispatch({
			type : 'INIT_ANECDOTES',
			data : anecdotes
		});
	};
};

const reducer = (state = [], action) => {
	console.log('state now: ', state);
	console.log('action', action);

	switch (action.type) {
		case 'UPVOTE':
			const id = action.data.id;
			const anecdoteToChange = state.find(a => a.id === id);
			const changedAnecdote = {
				...anecdoteToChange,
				votes : anecdoteToChange.votes + 1
			};
			return state.map(
				a => (a.id !== id ? a : changedAnecdote)
			);
		case 'NEW_ANECDOTE':
			return [ ...state, { ...action.data } ];
		case 'INIT_ANECDOTES':
			return action.data;
		default:
			return state;
	}
};

export default reducer;
