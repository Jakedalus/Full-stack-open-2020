const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const helper = require('../utils/test_helper');

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
	const users = await helper.usersInDb();

	const user = users[0].id;

	console.log('user', user);

	const blog = new Blog({ ...request.body, user });

	if (!blog.likes) blog.likes = 0;

	console.log('blog', blog);

	if (!blog.title && !blog.url) {
		console.log('no title or url!');
		response.status(400).end();
	} else {
		const newBlog = await blog.save();
		response.status(201).json(newBlog);
	}

	// blog.save().then(result => {
	// 	response.status(201).json(result);
	// });
});

blogsRouter.delete('/:id', async (request, response) => {
	console.log(request.params.id);
	const deletedBlog = await Blog.findByIdAndRemove(
		request.params.id
	);

	console.log('deletedBlog', deletedBlog);

	if (deletedBlog) {
		response.status(204).end();
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
