import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import NewBlogForm from './NewBlogForm';

describe('Test NewBlogForm Component', () => {
	const createBlog = jest.fn(),
		setCreateBlogFormVisible = jest.fn();

	let newBlogFormComponent;

	beforeEach(() => {
		newBlogFormComponent = render(
			<NewBlogForm
				createBlog={createBlog}
				setCreateBlogFormVisible={setCreateBlogFormVisible}
			/>
		);
	});

	test('calls createBlog with correct data when "create" button is clicked', () => {
		const title = newBlogFormComponent.container.querySelector(
			'#title'
		);
		const author = newBlogFormComponent.container.querySelector(
			'#author'
		);
		const url = newBlogFormComponent.container.querySelector(
			'#url'
		);

		const createBlogButton = newBlogFormComponent.getByText(
			'create'
		);

		fireEvent.change(title, {
			target : {
				value : 'new title'
			}
		});
		fireEvent.change(author, {
			target : {
				value : 'new author'
			}
		});
		fireEvent.change(url, {
			target : {
				value : 'new url'
			}
		});

		fireEvent.click(createBlogButton);

		// console.log(
		// 	'createBlog.mock.calls',
		// 	createBlog.mock.calls
		// );

		expect(createBlog.mock.calls).toHaveLength(1);
		expect(createBlog.mock.calls[0][0]).toEqual({
			author : 'new author',
			title  : 'new title',
			url    : 'new url'
		});
	});
});
