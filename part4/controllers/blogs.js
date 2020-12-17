const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const helper = require('../utils/test_helper');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// const getTokenFrom = request => {
// 	const authorization = request.get('authorization');
// 	if (
// 		authorization &&
// 		authorization.toLowerCase().startsWith('bearer')
// 	) {
// 		return authorization.substring(7);
// 	}

// 	return null;
// };

blogsRouter.get('/', async (request, response) => {
	// async version ------
	const blogs = await Blog.find({}).populate('user', {
		username : 1,
		name     : 1,
		_id      : 1
	});

	response.json(blogs);

	// Blog.find({}).then(blogs => {
	// 	response.json(blogs);
	// });
});

blogsRouter.post('/', async (request, response) => {
	///// assign all new blogs to first user before implementing token auth
	// const users = await helper.usersInDb();
	// const user = users[0].id;

	// // console.log('request.token', request.token);

	// const token = getTokenFrom(request);

	const decodedToken = jwt.verify(
		request.token,
		process.env.SECRET
	);
	if (!request.token || !decodedToken) {
		return response
			.status(401)
			.json({ error: 'token missing or invalid' });
	}
	const user = await User.findById(decodedToken.id);

	console.log('user', user);

	const blog = new Blog({ ...request.body, user });

	if (!blog.likes) blog.likes = 0;

	console.log('blog', blog);

	if (!blog.title && !blog.url) {
		console.log('no title or url!');
		response.status(400).end();
	} else {
		const newBlog = await blog.save();
		user.blogs = user.blogs.concat(newBlog._id);
		await user.save();

		response.status(201).json(newBlog);
	}

	// blog.save().then(result => {
	// 	response.status(201).json(result);
	// });
});

blogsRouter.delete('/:id', async (request, response) => {
	console.log(request.params.id);

	const decodedToken = jwt.verify(
		request.token,
		process.env.SECRET
	);
	if (!request.token || !decodedToken) {
		return response
			.status(401)
			.json({ error: 'token missing or invalid' });
	}
	const user = await User.findById(decodedToken.id);

	console.log('user', user);

	const blogToDelete = await Blog.findById(
		request.params.id
	);

	console.log('blogToDelete', blogToDelete);

	if (blogToDelete) {
		console.log(
			'user._id.toString() === blogToDelete.user.toString()',
			user._id.toString() === blogToDelete.user.toString()
		);

		if (
			user._id.toString() === blogToDelete.user.toString()
		) {
			const deletedBlog = await Blog.findByIdAndRemove(
				request.params.id
			);

			console.log('deletedBlog', deletedBlog);

			if (deletedBlog) {
				response.status(204).end();
			} else {
				response.status(400).end();
			}
		}
	} else {
		response.status(400).end();
	}
});

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body;
	const newBlog = {
		title  : body.title,
		author : body.author,
		url    : body.url,
		likes  : body.likes
	};
	console.log('body', body);
	console.log('newBlog', newBlog);
	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		newBlog,
		{
			new : true
		}
	);

	if (updatedBlog) {
		response.status(200).json(updatedBlog);
	} else {
		response.status(400).end();
	}
});

module.exports = blogsRouter;
