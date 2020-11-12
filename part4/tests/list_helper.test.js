const listHelper = require('../utils/list_helper');

console.log('...starting list_helper.test.js');

const blogs = [
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

test('dummy returns one (1)', () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);
	expect(result).toBe(1);
});

describe('total likes', () => {
	const listWithOneBlog = [
		{
			_id    : '5a422aa71b54a676234d17f8',
			title  : 'Go To Statement Considered Harmful',
			author : 'Edsger W. Dijkstra',
			url    :
				'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes  : 5,
			__v    : 0
		}
	];

	test('of empty list is zero', () => {
		const emptyBlogList = [];

		const result = listHelper.totalLikes(emptyBlogList);

		expect(result).toBe(0);
	});

	test('when list has only one blog equals likes of that blog', () => {
		const oneBlogList = [
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

		const result = listHelper.totalLikes(oneBlogList);

		// console.log(result, oneBlogList[0]);

		expect(result).toBe(oneBlogList[0].likes);
	});

	test('of a bigger list is calculated right', () => {
		const result = listHelper.totalLikes(blogs);

		expect(result).toBe(36);
	});
});

describe('favorite blog', () => {
	test('of empty list is {}', () => {
		const emptyBlogList = [];

		const result = listHelper.favoriteBlog(emptyBlogList);

		expect(result).toEqual({});
	});

	test('when list has only one blog equals that blog as favorite', () => {
		const oneBlogList = [
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
		const result = listHelper.favoriteBlog(oneBlogList);

		// console.log(result);

		const { title, author, likes } = oneBlogList[0];

		expect(result).toEqual({ title, author, likes });
	});

	test('returns blog with most likes of a bigger list', () => {
		const result = listHelper.favoriteBlog(blogs);

		expect(result).toEqual({
			title  : 'Canonical string reduction',
			author : 'Edsger W. Dijkstra',
			likes  : 12
		});
	});
});

describe('most blogs', () => {
	test('return author with most blogs written', () => {
		const result = listHelper.mostBlogs(blogs);

		// console.log(result);

		expect(result).toEqual({
			author : 'Robert C. Martin',
			blogs  : 3
		});
	});
});

describe('most likes', () => {
	test('return author with most likes total', () => {
		const result = listHelper.mostLikes(blogs);

		// console.log(result);

		expect(result).toEqual({
			author : 'Edsger W. Dijkstra',
			likes  : 17
		});
	});
});
