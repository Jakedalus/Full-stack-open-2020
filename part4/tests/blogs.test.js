const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = require('../app');
const blogsRouter = require('../controllers/blogs');
const blog = require('../models/blog');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

const initialUsers = [
	{
		username : 'michael_chan',
		name     : 'Michael Chan',
		password : '123abc',
		_id      : '5ff8dec1833e8a63f03a41b1',
		blogs    : [ '5a422a851b54a676234d17f7' ]
	},
	{
		username : 'the_dijk',
		name     : 'Edsger W. Dijkstra',
		password : '123abc',
		_id      : '5ff8deca6974bc3a42aef6eb',
		blogs    : [
			'5a422aa71b54a676234d17f8',
			'5a422b3a1b54a676234d17f9'
		]
	},
	{
		username : 'robby',
		author   : 'Robert C. Martin',
		password : '123abc',
		_id      : '5ff8ded00f03d739405d7c8e',
		blogs    : [
			'5a422b891b54a676234d17fa',
			'5a422ba71b54a676234d17fb',
			'5a422bc61b54a676234d17fc'
		]
	},
	{
		username : 'test_user',
		name     : 'TEST USER',
		password : '123abc',
		_id      : '5ff8e657b49df86e470cebae',
		blogs    : []
	}
];

const initialBlogs = [
	{
		_id    : '5ff8e97be70f49b594daa4a6',
		// _id    : mongoose.Types.ObjectId(),
		title  : 'TEST BLOG',
		author : 'TEST USER',
		url    : 'https://testing.com/',
		likes  : 77,
		user   : initialUsers[3]._id,
		__v    : 0
	},
	{
		_id    : '5a422a851b54a676234d17f7',
		// _id    : mongoose.Types.ObjectId(),
		title  : 'React patterns',
		author : 'Michael Chan',
		url    : 'https://reactpatterns.com/',
		likes  : 7,
		user   : initialUsers[0]._id,
		__v    : 0
	},
	{
		_id    : '5a422aa71b54a676234d17f8',
		// _id    : mongoose.Types.ObjectId(),
		title  : 'Go To Statement Considered Harmful',
		author : 'Edsger W. Dijkstra',
		url    :
			'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes  : 5,
		user   : initialUsers[1]._id,
		__v    : 0
	},
	{
		_id    : '5a422b3a1b54a676234d17f9',
		// _id    : mongoose.Types.ObjectId(),
		title  : 'Canonical string reduction',
		author : 'Edsger W. Dijkstra',
		url    :
			'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes  : 12,
		user   : initialUsers[1]._id,
		__v    : 0
	},
	{
		_id    : '5a422b891b54a676234d17fa',
		// _id    : mongoose.Types.ObjectId(),
		title  : 'First class tests',
		author : 'Robert C. Martin',
		url    :
			'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes  : 10,
		user   : initialUsers[2]._id,
		__v    : 0
	},
	{
		_id    : '5a422ba71b54a676234d17fb',
		// _id    : mongoose.Types.ObjectId(),
		title  : 'TDD harms architecture',
		author : 'Robert C. Martin',
		url    :
			'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes  : 0,
		user   : initialUsers[2]._id,
		__v    : 0
	},
	{
		_id    : '5a422bc61b54a676234d17fc',
		// _id    : mongoose.Types.ObjectId(),
		title  : 'Type wars',
		author : 'Robert C. Martin',
		url    :
			'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes  : 2,
		user   : initialUsers[2]._id,
		__v    : 0
	}
];

let token;

beforeEach(async () => {
	// Create initial users in db
	await User.deleteMany({});

	for (let user of initialUsers) {
		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(
			user.password,
			saltRounds
		);
		let userObject = new User({
			...user,
			password : passwordHash
		});
		await userObject.save();
	}

	// Create initial blogs in db
	await Blog.deleteMany({});

	for (let blog of initialBlogs) {
		let blogObject = new Blog(blog);
		await blogObject.save();
	}

	// Login test_user and get token
	const user = await User.findOne({
		username : 'test_user'
	});

	const userForToken = {
		username : user.username,
		id       : user._id
	};

	token = jwt.sign(userForToken, process.env.SECRET);

	console.log('token', token);
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

		expect(response.body).toHaveLength(7);
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
			.set('Authorization', 'Bearer ' + token)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const response = await api.get('/api/blogs');

		console.log(response.body);

		const contents = response.body.map(r => r.author);

		expect(response.body).toHaveLength(8);
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
			.set('Authorization', 'Bearer ' + token)
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

		await api
			.post('/api/blogs')
			.set('Authorization', 'Bearer ' + token)
			.send(newBlog)
			.expect(400);
	});
});

describe('deletion of a blog', () => {
	test('succeeds with status code 204 if id is valid', async () => {
		const notesAtStart = await api.get('/api/blogs');
		const blogToDelete = notesAtStart.body[0];

		console.log('blogToDelete', blogToDelete);

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set('Authorization', 'Bearer ' + token)
			.expect(204);

		const notesAtEnd = await api.get('/api/blogs');

		console.log('notesAtEnd.body', notesAtEnd.body);

		expect(notesAtEnd.body).toHaveLength(
			notesAtStart.body.length - 1
		);

		const titles = notesAtEnd.body.map(r => r.title);

		expect(titles).not.toContain(blogToDelete.title);
	});

	test('fails with status code 400 if id is invalid', async () => {
		const notesAtStart = await api.get('/api/blogs');
		const blogToDelete = notesAtStart.body[0];

		console.log('blogToDelete', blogToDelete);

		const id = mongoose.Types.ObjectId();

		await api
			.delete(`/api/blogs/${id}`)
			.set('Authorization', 'Bearer ' + token)
			.expect(400);

		const notesAtEnd = await api.get('/api/blogs');

		console.log('notesAtEnd.body', notesAtEnd.body);

		expect(notesAtEnd.body).toHaveLength(
			notesAtStart.body.length
		);

		const titles = notesAtEnd.body.map(r => r.title);

		expect(titles).toContain(blogToDelete.title);
	});
});

describe('update a blog', () => {
	test('succeeds with status code 204 and updated blog if id is valid', async () => {
		const blogsAtStart = await api.get('/api/blogs');

		const blogToUpdate = blogsAtStart.body[0];

		console.log('blogToUpdate', blogToUpdate);

		const newBlog = {
			...blogToUpdate,
			user  : initialUsers[3]._id, // expects populated user field unless this is included
			likes : 17
		};

		const testBlog = { ...newBlog };

		console.log('newBlog', newBlog);
		console.log('testBlog', testBlog);

		const updatedBlog = await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.set('Authorization', 'Bearer ' + token)
			.send(newBlog)
			.expect(200);

		console.log('updatedBlog.body', updatedBlog.body);
		console.log('newBlog after call', newBlog);
		console.log('testBlog after call', testBlog);

		expect(updatedBlog.body).toEqual(testBlog);
	});

	test('fails with status code 400 because of invalid id', async () => {
		const blogsAtStart = await api.get('/api/blogs');

		const blogToUpdate = blogsAtStart.body[0];

		const newBlog = {
			...blogToUpdate,
			user  : initialUsers[3]._id,
			likes : 17
		};

		const id = mongoose.Types.ObjectId();

		console.log('newBlog', newBlog);

		const updatedBlog = await api
			.put(`/api/blogs/${id}`)
			.set('Authorization', 'Bearer ' + token)
			.send(newBlog)
			.expect(400);

		console.log('updatedBlog.body', updatedBlog.body);

		expect(updatedBlog.body).toEqual({});
	});
});

afterAll(() => mongoose.connection.close());
