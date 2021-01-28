import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from '../components/Blog';

test('renders Blog content', () => {
	const blog = {
		title  : 'Test Title',
		author : 'Test Author',
		url    : 'www.test.test',
		likes  : '66',
		id     : 'test_id',
		user   : 'test_user'
	};

	const editBlog = jest.fn();
	const deleteBlog = jest.fn();

	const blogComponent = render(
		<Blog
			blog={blog}
			editBlog={editBlog}
			deleteBlog={deleteBlog}
		/>
	);

	expect(blogComponent.container).toHaveTextContent(
		blog.title
	);
	expect(blogComponent.container).toHaveTextContent(
		blog.author
	);
	expect(blogComponent.container).not.toHaveTextContent(
		blog.url
	);
	expect(blogComponent.container).not.toHaveTextContent(
		blog.likes
	);
});
