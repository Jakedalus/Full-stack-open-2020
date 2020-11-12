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

const mostBlogs = blogs => {
	const counts = {};
	let maxAuthor = null,
		maxBlogs = 0;
	for (let blog of blogs) {
		// console.log(blog, counts);
		const { author } = blog;
		counts[author] = counts[author]
			? counts[author] + 1
			: 1;
		if (counts[author] > maxBlogs) {
			maxBlogs = counts[author];
			maxAuthor = author;
		}
	}

	return { author: maxAuthor, blogs: maxBlogs };
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs
};
