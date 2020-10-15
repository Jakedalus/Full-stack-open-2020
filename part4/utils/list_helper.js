const dummy = blogs => 1;

const totalLikes = list => {
	console.log('totalLikes, list:', list);
	return list.length === 0
		? 0
		: list.reduce((sum, blog) => {
				sum + blog.likes;
			}, 0);
};

module.exports = { dummy, totalLikes };
