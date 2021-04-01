import React, {
	useState,
	useEffect,
	useLayoutEffect
} from 'react';
import jwt from 'jsonwebtoken';
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
	const [
		createBlogFormVisible,
		setCreateBlogFormVisible
	] = useState(false);

	useEffect(() => {
		async function fetchBlogs() {
			const tempBlogs = await blogService.getAll();

			tempBlogs.sort((a, b) => +b.likes - +a.likes);
			setBlogs(tempBlogs);
		}
		fetchBlogs();
	}, []);

	useLayoutEffect(() => {
		const loggedInUserJSON = window.localStorage.getItem(
			'loggedInUser'
		);
		if (loggedInUserJSON) {
			const user = JSON.parse(loggedInUserJSON);

			console.log('user', user);
			// console.log('process.env', process.env);

			const decodedToken = jwt.verify(
				user.token,
				process.env.REACT_APP_SECRET
			);
			console.log('decodedToken', decodedToken);
			setUser({ ...user, id: decodedToken.id });
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

	const createBlog = async blogObject => {
		const { title, author, url } = blogObject;
		console.log('title, author, url:', title, author, url);
		console.log('headers:', {
			headers : { Authorization: `bearer ${user.token}` }
		});
		const newBlog = await blogService.createNew(
			{ title, author, url },
			{ headers: { Authorization: `bearer ${user.token}` } }
		);

		const tempBlogs = [ ...blogs, newBlog ].sort(
			(a, b) => +b.likes - +a.likes
		);

		setBlogs(tempBlogs);

		setCreateBlogFormVisible(false);

		displayNotification({
			message : `a new blog ${newBlog.title} by ${newBlog.author} was created`,
			type    : 'success'
		});
	};

	const editBlog = async (id, blogObject) => {
		try {
			const updatedBlog = await blogService.updateBlog(
				id,
				blogObject,
				{
					headers : {
						Authorization : `bearer ${user.token}`
					}
				}
			);

			console.log(
				'App.js, editBlog, updatedBlog',
				updatedBlog
			);

			console.log('{ ...updatedBlog, user: user.name }', {
				...updatedBlog,
				user : user
			});

			const updatedBlogs = blogs.map(
				blog =>
					blog.id === id
						? { ...updatedBlog, user: user }
						: blog
			);

			const tempBlogs = [ ...updatedBlogs ].sort(
				(a, b) => +b.likes - +a.likes
			);

			setBlogs(tempBlogs);

			displayNotification({
				message : `the blog ${updatedBlog.title} by ${updatedBlog.author} has been updated`,
				type    : 'success'
			});
		} catch (e) {
			displayNotification({
				message : `failed to update blog`,
				type    : 'error'
			});
		}
	};

	const deleteBlog = async (id, title, author) => {
		const shouldDeleteBlog = window.confirm(
			`Do you really want to delete ${title} by ${author}?`
		);

		if (shouldDeleteBlog) {
			try {
				const deletedBlog = await blogService.deleteBlog(
					id,
					{
						headers : {
							Authorization : `bearer ${user.token}`
						}
					}
				);

				console.log('deletedBlog', deletedBlog);

				const updatedBlogs = blogs.filter(
					blog => blog.id !== id
				);

				const tempBlogs = [ ...updatedBlogs ].sort(
					(a, b) => +b.likes - +a.likes
				);

				setBlogs(tempBlogs);

				displayNotification({
					message : `the blog ${deletedBlog.title} has been deleted`,
					type    : 'success'
				});
			} catch (e) {
				displayNotification({
					message : `failed to update blog`,
					type    : 'error'
				});
			}
		}
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
			<h1>Blogs!</h1>
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
					{createBlogFormVisible && (
						<NewBlogForm
							createBlog={createBlog}
							setCreateBlogFormVisible={
								setCreateBlogFormVisible
							}
						/>
					)}
					{!createBlogFormVisible && (
						<button
							onClick={() => setCreateBlogFormVisible(true)}
						>
							new note
						</button>
					)}
					<div id='blog-list'>
						{blogs.map(blog => (
							<Blog
								key={blog.id}
								blog={blog}
								editBlog={editBlog}
								deleteBlog={deleteBlog}
								currentUser={user}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default App;
