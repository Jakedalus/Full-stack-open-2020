const dummy = blogs => 1;

const totalLikes = list => {
	console.log('totalLikes, list:', list);
	return list.length === 0
		? 0
		: list.reduce((sum, blog) => {
				return sum + blog.likes;
			}, 0);
};

const favoriteBlog = blogs => {
	let maxLikes = 0,
		maxBlog = {};
	const fav = blogs.filter(blog => {
		if (blog.likes > maxLikes) {
			maxLikes = blog.likes;
			maxBlog = blog;
		}
	});

	return maxBlog;
};

module.exports = { dummy, totalLikes, favoriteBlog };
