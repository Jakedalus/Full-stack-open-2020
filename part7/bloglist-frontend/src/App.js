import React, {
	useState,
	useEffect,
	useLayoutEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Switch,
	Route,
	Link,
	// useParams,
	useRouteMatch,
	useHistory
} from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import BlogList from './components/BlogList';
import UserList from './components/UserList';
import UserPage from './components/UserPage';
import BlogPage from './components/BlogPage';
import Notification from './components/Notification';
import Header from './components/Header';
import './App.css';
import {
	initializeBlogs,
	addLike,
	removeBlog
} from './reducers/blogReducer';
import { login, logout } from './reducers/userReducer';
import { setNotification } from './reducers/notificationReducer';
import { getAllUsers } from './reducers/usersReducer';

// "username": "sample_username99",
// "password": "samplesample"

const App = () => {
	const dispatch = useDispatch();

	const users = useSelector(state => {
		console.log(`state`, state);
		return state.users;
	});

	const blogs = useSelector(state => state.blogs).sort(
		(a, b) => +b.likes - +a.likes
	);
	const user = useSelector(state => state.user);
	const notification = useSelector(
		state => state.notification
	);

	const userMatch = useRouteMatch('/users/:id');
	const userPage = userMatch
		? users.find(user => user.id === userMatch.params.id)
		: null;

	const blogMatch = useRouteMatch('/blogs/:id');
	console.log(`blogMatch`, blogMatch);
	const blogPage = blogMatch
		? blogs.find(blog => blog.id === blogMatch.params.id)
		: null;

	console.log(`blogPage`, blogPage);

	console.log(`users`, users);

	console.log(`blogs`, blogs);

	console.log(`user`, user);

	// const [ blogs, setBlogs ] = useState([]);
	// const [ notification, setNotification ] = useState(null);

	// const [ user, setUser ] = useState(null);
	const [
		createBlogFormVisible,
		setCreateBlogFormVisible
	] = useState(false);

	// useEffect(
	// 	() => {
	// 		dispatch(getAllUsers());
	// 	},
	// 	[ dispatch ]
	// );

	useEffect(
		() => {
			// async function fetchBlogs() {
			// 	const tempBlogs = await blogService.getAll();
			// 	tempBlogs.sort((a, b) => +b.likes - +a.likes);
			// 	setBlogs(tempBlogs);
			// }
			// fetchBlogs();
			// console.log(
			// 	`Initialize Blogs!`,
			// 	dispatch,
			// 	initializeBlogs
			// );
			dispatch(getAllUsers());
			dispatch(initializeBlogs());
		},
		[ dispatch ]
	);

	useLayoutEffect(
		() => {
			const loggedInUserJSON = window.localStorage.getItem(
				'loggedInUser'
			);
			console.log(`loggedInUserJSON`, loggedInUserJSON);

			if (loggedInUserJSON) {
				const user = JSON.parse(loggedInUserJSON);

				console.log('user', user);
				// console.log('process.env', process.env);

				const decodedToken = jwt.verify(
					user.token,
					process.env.REACT_APP_SECRET
				);
				console.log('decodedToken', decodedToken);

				dispatch(login({ ...user, id: decodedToken.id }));

				// setUser({ ...user, id: decodedToken.id });
			}
		},
		[ dispatch ]
	);

	const displayNotification = ({ message, type }) => {
		dispatch(
			setNotification(
				{
					message,
					type
				},
				5000
			)
		);
	};

	// const createBlog = async blogObject => {
	// 	const { title, author, url } = blogObject;
	// 	console.log('title, author, url:', title, author, url);
	// 	console.log('headers:', {
	// 		headers : { Authorization: `bearer ${user.token}` }
	// 	});
	// 	const newBlog = await blogService.createNew(
	// 		{ title, author, url },
	// 		{ headers: { Authorization: `bearer ${user.token}` } }
	// 	);

	// 	const tempBlogs = [ ...blogs, newBlog ].sort(
	// 		(a, b) => +b.likes - +a.likes
	// 	);

	// 	// setBlogs(tempBlogs);

	// 	setCreateBlogFormVisible(false);

	// 	displayNotification({
	// 		message : `a new blog ${newBlog.title} by ${newBlog.author} was created`,
	// 		type    : 'success'
	// 	});
	// };

	// const editBlog = async (id, blogObject) => {
	// 	try {
	// 		const updatedBlog = await blogService.updateBlog(
	// 			id,
	// 			blogObject,
	// 			{
	// 				headers : {
	// 					Authorization : `bearer ${user.token}`
	// 				}
	// 			}
	// 		);

	// 		console.log(
	// 			'App.js, editBlog, updatedBlog',
	// 			updatedBlog
	// 		);

	// 		console.log('{ ...updatedBlog, user: user.name }', {
	// 			...updatedBlog,
	// 			user : user
	// 		});

	// 		const updatedBlogs = blogs.map(
	// 			blog =>
	// 				blog.id === id
	// 					? { ...updatedBlog, user: user }
	// 					: blog
	// 		);

	// 		const tempBlogs = [ ...updatedBlogs ].sort(
	// 			(a, b) => +b.likes - +a.likes
	// 		);

	// 		// setBlogs(tempBlogs);

	// 		displayNotification({
	// 			message : `the blog ${updatedBlog.title} by ${updatedBlog.author} has been updated`,
	// 			type    : 'success'
	// 		});
	// 	} catch (e) {
	// 		displayNotification({
	// 			message : `failed to update blog`,
	// 			type    : 'error'
	// 		});
	// 	}
	// };

	// const handleLogin = async e => {
	// 	e.preventDefault();
	// 	console.log('logging in with: ', username, password);
	// 	try {
	// 		const user = await loginService.login({
	// 			username,
	// 			password
	// 		});

	// 		window.localStorage.setItem(
	// 			'loggedInUser',
	// 			JSON.stringify(user)
	// 		);

	// 		setUser(user);
	// 		setUsername('');
	// 		setPassword('');

	// 		console.log('user', user);
	// 	} catch (exception) {
	// 		console.log('exception', exception);
	// 		displayNotification({
	// 			message : 'Wrong credentials',
	// 			type    : 'error'
	// 		});
	// 	}
	// };

	const handleLogout = e => {
		window.localStorage.removeItem('loggedInUser');

		dispatch(logout());

		// setUser(null);
	};

	return (
		<div>
			<h1>Blogs!</h1>
			{notification && (
				<Notification notification={notification} />
			)}
			{user.length === 0 ? (
				<LoginForm />
			) : (
				<div>
					<Header user={user} handleLogout={handleLogout} />
					{createBlogFormVisible && (
						<NewBlogForm
							// createBlog={createBlog}
							displayNotification={displayNotification}
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
					<Switch>
						<Route path='/users/:id'>
							<UserPage user={userPage} />
						</Route>
						<Route path='/users'>
							<UserList users={users} />
						</Route>
						<Route path='/blogs/:id'>
							<BlogPage blog={blogPage} />
						</Route>
						<Route path={[ '/blogs', '/' ]}>
							<BlogList blogs={blogs} user={user} />
						</Route>
					</Switch>
				</div>
			)}
		</div>
	);
};

export default App;
