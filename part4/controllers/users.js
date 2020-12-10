const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.post('/', async (request, response) => {
	const body = request.body;

	const { username, name, password } = body;

	if (!username || !password) {
		response.status(400).json({
			error : 'must include name and password'
		});
	}

	if (username.length < 3 || password.length < 3) {
		response.status(400).json({
			error :
				'username and password must be at least 3 characters long'
		});
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(
		password,
		saltRounds
	);

	const user = new User({
		username     : username,
		name         : name,
		passwordHash
	});

	const savedUser = await user.save();

	response.status(200).json(savedUser);
});

module.exports = userRouter;
