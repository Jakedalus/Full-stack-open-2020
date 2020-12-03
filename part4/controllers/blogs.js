const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
	// async version ------
	const blogs = await Blog.find({});

	response.json(blogs);

	// Blog.find({}).then(blogs => {
	// 	response.json(blogs);
	// });
});

blogsRouter.post('/', (request, response) => {
	const blog = new Blog(request.body);

	if (!blog.likes) blog.likes = 0;

	console.log('blog', blog);

	if (!blog.title && !blog.url) {
		console.log('no title or url!');
		response.status(400).end();
	} else {
		const newBlog = blog.save();
		response.status(201).json(newBlog);
	}

	// blog.save().then(result => {
	// 	response.status(201).json(result);
	// });
});

blogsRouter.delete('/:id', async (request, response) => {
	console.log(request.params.id);
	await Blog.findByIdAndRemove(request.params.id);

	response.status(204).end();
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
