const dummy = blogs => 1;

const totalLikes = list => {
	// console.log('totalLikes, list:', list);
	return list.length === 0
		? 0
		: list.reduce((sum, blog) => {
				return sum + blog.likes;
			}, 0);
};

const favoriteBlog = blogs => {
	let maxLikes = 0,
		maxBlog = {};
	blogs.forEach(blog => {
		if (blog.likes > maxLikes) {
			maxLikes = blog.likes;
			maxBlog = blog;
		}
	});

	// console.log(
	// 	'favoriteBlog, maxLikes, maxBlog:',
	// 	maxLikes,
	// 	maxBlog
	// );

	const { author, title, likes } = maxBlog;

	// console.log({ author, title, likes });

	return { author, title, likes };
};

module.exports = { dummy, totalLikes, favoriteBlog };
