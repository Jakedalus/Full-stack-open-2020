import React, { useState } from 'react';
import {
	Switch,
	Route,
	Link,
	// useParams,
	useRouteMatch,
	useHistory
} from 'react-router-dom';
import { useField } from './hooks/index';

const Menu = () => {
	const padding = {
		paddingRight : 5
	};

	return (
		<div>
			<div>
				<Link to='/' style={padding}>
					anecdotes
				</Link>
				<Link to='/create' style={padding}>
					create new
				</Link>
				<Link to='/about' style={padding}>
					about
				</Link>
			</div>
		</div>
	);
};

const AnecdoteList = ({ anecdotes }) => (
	<div>
		<h2>Anecdotes!</h2>
		<ul>
			{anecdotes.map(anecdote => (
				<li key={anecdote.id}>
					<Link to={`/anecdotes/${anecdote.id}`}>
						{anecdote.content}
					</Link>
				</li>
			))}
		</ul>
	</div>
);

const Anecdote = ({ anecdote }) => {
	// const id = useParams().id;
	// console.log('id', id);

	console.log('anecdote', anecdote);
	return (
		<div>
			<h2>
				{anecdote.content} by {anecdote.author}
			</h2>
			<p>has {anecdote.votes} votes</p>
			<p>
				see more at{' '}
				<a href={anecdote.info}>{anecdote.info}</a>
			</p>
		</div>
	);
};

const About = () => (
	<div>
		<h2>About anecdote app</h2>
		<p>According to Wikipedia:</p>

		<em>
			An anecdote is a brief, revealing account of an
			individual person or an incident. Occasionally
			humorous, anecdotes differ from jokes because their
			primary purpose is not simply to provoke laughter but
			to reveal a truth more general than the brief tale
			itself, such as to characterize a person by
			delineating a specific quirk or trait, to communicate
			an abstract idea about a person, place, or thing
			through the concrete details of a short narrative. An
			anecdote is "a story with a point."
		</em>

		<p>
			Software engineering is full of excellent anecdotes,
			at this app you can find the best and add more.
		</p>
	</div>
);

const Footer = () => (
	<div>
		Anecdote app for{' '}
		<a href='https://courses.helsinki.fi/fi/tkt21009'>
			Full Stack -websovelluskehitys
		</a>. See{' '}
		<a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>
			https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
		</a>{' '}
		for the source code.
	</div>
);

const CreateNew = props => {
	// const [ content, setContent ] = useState('');
	// const [ author, setAuthor ] = useState('');
	// const [ info, setInfo ] = useState('');

	const { reset: resetContent, ...content } = useField(
		'text'
	);
	const { reset: resetAuthor, ...author } = useField(
		'text'
	);
	const { reset: resetInfo, ...info } = useField('text');

	const history = useHistory();

	const reset = () => {
		resetContent();
		resetAuthor();
		resetInfo();
	};

	const handleSubmit = e => {
		e.preventDefault();
		props.addNew({
			content : content.value,
			author  : author.value,
			info    : info.value,
			votes   : 0
		});
		history.push('/');
		props.setNotification(
			`Created new anecdote ${content}`
		);
		setTimeout(() => props.setNotification(''), 5000);
	};

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input {...content} />
				</div>
				<div>
					author
					<input {...author} />
				</div>
				<div>
					url for more info
					<input {...info} />
				</div>
				<button type='submit'>create</button>
				<button type='button' onClick={reset}>
					reset
				</button>
			</form>
		</div>
	);
};

const App = () => {
	const [ notification, setNotification ] = useState('');

	const [ anecdotes, setAnecdotes ] = useState([
		{
			content : 'If it hurts, do it more often',
			author  : 'Jez Humble',
			info    :
				'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
			votes   : 0,
			id      : '1'
		},
		{
			content :
				'Premature optimization is the root of all evil',
			author  : 'Donald Knuth',
			info    : 'http://wiki.c2.com/?PrematureOptimization',
			votes   : 0,
			id      : '2'
		}
	]);

	const addNew = anecdote => {
		anecdote.id = (Math.random() * 10000).toFixed(0);
		setAnecdotes(anecdotes.concat(anecdote));
	};

	const match = useRouteMatch('/anecdotes/:id');
	const anecdote = match
		? anecdotes.find(
				a => Number(a.id) === Number(match.params.id)
			)
		: null;

	// const anecdoteById = id =>
	// 	anecdotes.find(a => a.id === id);

	// const vote = id => {
	// 	const anecdote = anecdoteById(id);

	// 	const voted = {
	// 		...anecdote,
	// 		votes : anecdote.votes + 1
	// 	};

	// 	setAnecdotes(
	// 		anecdotes.map(a => (a.id === id ? voted : a))
	// 	);
	// };

	console.log('notification', notification);

	return (
		<div>
			<h1>Software anecdotes</h1>
			<Menu />
			<p>
				{notification && (
					<div
						style={{
							border  : '1px solid black',
							padding : '5px'
						}}
					>
						{notification}
					</div>
				)}
			</p>
			<Switch>
				<Route path='/create'>
					<CreateNew
						addNew={addNew}
						setNotification={setNotification}
					/>
				</Route>
				<Route path='/about'>
					<About />
				</Route>
				<Route path='/anecdotes/:id'>
					<Anecdote anecdote={anecdote} />
				</Route>
				<Route path='/'>
					<AnecdoteList anecdotes={anecdotes} />
				</Route>
			</Switch>
			<Footer />
		</div>
	);
};

export default App;
