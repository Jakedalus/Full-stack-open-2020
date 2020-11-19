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

module.exports = blogsRouter;
