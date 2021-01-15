import React, {
	useState,
	useEffect,
	useLayoutEffect
} from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import './App.css';

// "username": "sample_username99",
// "password": "samplesample"

const App = () => {
	const [ blogs, setBlogs ] = useState([]);
	const [ notification, setNotification ] = useState(null);
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ user, setUser ] = useState(null);
	const [ title, setTitle ] = useState('');
	const [ author, setAuthor ] = useState('');
	const [ url, setUrl ] = useState('');

	useEffect(() => {
		blogService.getAll().then(blogs => setBlogs(blogs));
	}, []);

	useLayoutEffect(() => {
		const loggedInUserJSON = window.localStorage.getItem(
			'loggedInUser'
		);
		if (loggedInUserJSON) {
			const user = JSON.parse(loggedInUserJSON);
			setUser(user);
			// handleLogin.setToken(user.token);
		}
	}, []);

	const displayNotification = ({ message, type }) => {
		setNotification({
			message,
			type
		});
		setTimeout(() => {
			setNotification(null);
		}, 5000);
	};

	const handleCreateBlog = async e => {
		e.preventDefault();
		console.log('title, author, url:', title, author, url);
		console.log(
			'{ headers: { Authorization: `bearer ${user.token}` } }',
			{ headers: { Authorization: `bearer ${user.token}` } }
		);
		const newBlog = await blogService.createNew(
			{ title, author, url },
			{ headers: { Authorization: `bearer ${user.token}` } }
		);

		setBlogs([ ...blogs, newBlog ]);
		setTitle('');
		setAuthor('');
		setUrl('');

		displayNotification({
			message : `a new blog ${newBlog.title} by ${newBlog.author} was created`,
			type    : 'success'
		});
	};

	const handleLogin = async e => {
		e.preventDefault();
		console.log('logging in with: ', username, password);
		try {
			const user = await loginService.login({
				username,
				password
			});

			window.localStorage.setItem(
				'loggedInUser',
				JSON.stringify(user)
			);

			setUser(user);
			setUsername('');
			setPassword('');

			console.log('user', user);
		} catch (exception) {
			console.log('exception', exception);
			displayNotification({
				message : 'Wrong credentials',
				type    : 'error'
			});
		}
	};

	const handleLogout = e => {
		window.localStorage.removeItem('loggedInUser');
		setUser(null);
	};

	return (
		<div>
			<h1>Blogs</h1>
			{notification && (
				<Notification notification={notification} />
			)}
			{user === null ? (
				<LoginForm
					username={username}
					password={password}
					setUsername={setUsername}
					setPassword={setPassword}
					handleLogin={handleLogin}
				/>
			) : (
				<div>
					<h2>
						{user.name} is logged in
						<button onClick={handleLogout}>logout</button>
					</h2>
					<NewBlogForm
						title={title}
						setTitle={setTitle}
						author={author}
						setAuthor={setAuthor}
						url={url}
						setUrl={setUrl}
						handleCreateBlog={handleCreateBlog}
					/>
					{blogs.map(blog => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</div>
	);
};

export default App;
