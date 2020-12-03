const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const blogsRouter = require('../controllers/blogs');
const blog = require('../models/blog');
const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
	{
		_id    : '5a422a851b54a676234d17f7',
		title  : 'React patterns',
		author : 'Michael Chan',
		url    : 'https://reactpatterns.com/',
		likes  : 7,
		__v    : 0
	},
	{
		_id    : '5a422aa71b54a676234d17f8',
		title  : 'Go To Statement Considered Harmful',
		author : 'Edsger W. Dijkstra',
		url    :
			'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes  : 5,
		__v    : 0
	},
	{
		_id    : '5a422b3a1b54a676234d17f9',
		title  : 'Canonical string reduction',
		author : 'Edsger W. Dijkstra',
		url    :
			'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes  : 12,
		__v    : 0
	},
	{
		_id    : '5a422b891b54a676234d17fa',
		title  : 'First class tests',
		author : 'Robert C. Martin',
		url    :
			'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes  : 10,
		__v    : 0
	},
	{
		_id    : '5a422ba71b54a676234d17fb',
		title  : 'TDD harms architecture',
		author : 'Robert C. Martin',
		url    :
			'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes  : 0,
		__v    : 0
	},
	{
		_id    : '5a422bc61b54a676234d17fc',
		title  : 'Type wars',
		author : 'Robert C. Martin',
		url    :
			'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes  : 2,
		__v    : 0
	}
];

beforeEach(async () => {
	await Blog.deleteMany({});

	for (let blog of initialBlogs) {
		let blogObject = new Blog(blog);
		await blogObject.save();
	}
});

describe('blog api tests', () => {
	test('blogs are returned as json', async () => {
		const response = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);

		console.log(response.body);
	});

	test('there are six blogs', async () => {
		const response = await api.get('/api/blogs');

		console.log(response.body);

		expect(response.body).toHaveLength(6);
	});

	test('blogs should have an "id" property', async () => {
		const response = await api.get('/api/blogs');

		console.log(response.body);

		expect(response.body[0].id).toBeDefined();
	});

	test('new blog should be added to the database', async () => {
		const newBlog = {
			title  : 'TEST TITLE',
			author : 'TEST AUTHOR',
			url    : 'http://www.test.com',
			likes  : 20
		};

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const response = await api.get('/api/blogs');

		console.log(response.body);

		const contents = response.body.map(r => r.author);

		expect(response.body).toHaveLength(7);
		expect(contents).toContain('TEST AUTHOR');
	});

	test('new blog without a "likes" property defaults to 0', async () => {
		const newBlog = {
			title  : 'TEST TITLE',
			author : 'TEST AUTHOR',
			url    : 'http://www.test.com'
		};

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const response = await api.get('/api/blogs');

		console.log(response.body);

		const newBlogFromDb = response.body.filter(
			blog => blog.author === 'TEST AUTHOR'
		)[0];

		// console.log(
		// 	'******',
		// 	newBlogFromDb,
		// 	newBlogFromDb.likes
		// );

		expect(newBlogFromDb.likes).toBe(0);
	});

	test('new blog without title and url causes 400 Bad Request', async () => {
		const newBlog = {
			author : 'TEST AUTHOR'
		};

		await api.post('/api/blogs').send(newBlog).expect(400);
	});
});

describe('deletion of a blog', () => {
	test.only(
		'succeeds with status code 204 if id is valid',
		async () => {
			const notesAtStart = await api.get('/api/blogs');
			const blogToDelete = notesAtStart.body[0].id;

			console.log('blogToDelete', blogToDelete);

			await api
				.delete(`/api/blogs/${blogToDelete}`)
				.expect(204);

			const notesAtEnd = await api.get('/api/blogs');

			console.log('notesAtEnd.body', notesAtEnd.body);

			expect(notesAtEnd.body).toHaveLength(
				notesAtStart.body.length - 1
			);

			const titles = notesAtEnd.body.map(r => r.title);

			expect(titles).not.toContain(blogToDelete.title);
		}
	);
});

afterAll(() => mongoose.connection.close());
