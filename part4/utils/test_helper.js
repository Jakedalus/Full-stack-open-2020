const User = require('../models/user');

const usersInDb = async () => {
	console.log('usersInDb, finding users!');
	const users = await User.find({});
	console.log('users', users);
	return users.map(u => u.toJSON());
};

module.exports = {
	usersInDb
};
