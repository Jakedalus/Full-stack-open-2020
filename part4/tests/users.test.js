const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const helper = require('../utils/test_helper');
const app = require('../app');
const api = supertest(app);

describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		console.log('beforeEach, initializing test users db');
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash('sekret', 10);
		const user = new User({
			username     : 'root',
			passwordHash
		});

		await user.save();
		console.log('beforeEach, user saved');
	});

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username : 'Jakedalus',
			name     : 'Jacob A. Carpenter',
			password : 'another sekret'
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(
			usersAtStart.length + 1
		);

		const username = usersAtEnd.map(u => u.username);
		expect(username).toContain(newUser.username);
	});

	test('attempt to create user with non-unique username fails', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username : 'root',
			name     : 'Jacob A. Carpenter',
			password : 'another sekret'
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});

	test('attempt to create user with username less than 3 characters fails', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username : 'Ja',
			name     : 'Jacob A. Carpenter',
			password : 'another sekret'
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);

		const username = usersAtEnd.map(u => u.username);
		expect(username).not.toContain(newUser.username);
	});

	test('attempt to create user with password less than 3 characters fails', async () => {
		console.log(
			'attempt to create user with password less than 3 characters fails'
		);
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username : 'Jakedalus',
			name     : 'Jacob A. Carpenter',
			password : 'an'
		};

		console.log('what 1');

		await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		console.log('what 2');

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);

		console.log('what 3');

		const username = usersAtEnd.map(u => u.username);
		expect(username).not.toContain(newUser.username);
	});
});

afterAll(() => mongoose.connection.close());
