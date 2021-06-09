import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { ALL_AUTHORS, ALL_BOOKS } from './queries/queries';

const App = () => {
	const [ page, setPage ] = useState('authors');

	const authorsResult = useQuery(ALL_AUTHORS, {
		pollInterval : 2000
	});

	const booksResult = useQuery(ALL_BOOKS, {
		pollInterval : 2000
	});

	if (authorsResult.loading || booksResult.loading) {
		return <div>loading...</div>;
	}

	console.log(
		`authorsResult.data.allAuthors`,
		authorsResult.data.allAuthors
	);

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>
					authors
				</button>
				<button onClick={() => setPage('books')}>
					books
				</button>
				<button onClick={() => setPage('add')}>
					add book
				</button>
			</div>

			<Authors
				authors={authorsResult.data.allAuthors}
				show={page === 'authors'}
			/>

			<Books
				books={booksResult.data.allBooks}
				show={page === 'books'}
			/>

			<NewBook show={page === 'add'} />
		</div>
	);
};

export default App;
