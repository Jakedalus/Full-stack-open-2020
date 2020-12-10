const User = require('../models/user');

const usersInDb = async () => {
	const users = await User.find({});
	console.log('usersInDb, finding users!');
	console.log('users', users);
	return users.map(u => u.toJSON());
};

module.exports = {
	usersInDb
};
