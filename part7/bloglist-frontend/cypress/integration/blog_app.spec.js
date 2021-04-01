describe('Blog App', function() {
	const user1 = {
		username : 'test_user',
		name     : 'Francis Bacon',
		password : 'abc123',
		blogs    : []
	};
	const user2 = {
		username : 'test_user_2',
		name     : 'M. John Harrison',
		password : 'secret',
		blogs    : []
	};
	beforeEach(function() {
		cy.request(
			'POST',
			'http://localhost:3001/api/testing/reset'
		);

		cy.request(
			'POST',
			'http://localhost:3001/api/users',
			user1
		);
		cy.request(
			'POST',
			'http://localhost:3001/api/users',
			user2
		);
		cy.visit('http://localhost:3000');
	});

	it('front page can be opened', function() {
		cy.contains('Blogs');
	});

	it('login form is shown', function() {
		cy.contains('Login to Application');
		cy.get('button').contains('login');
	});

	describe('Login tests', function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username').type('test_user');
			cy.get('#password').type('abc123');
			cy.get('#login-button').click();

			cy.contains(`${user1.name} is logged in`);
		});

		it('fails with incorrect credentials', function() {
			cy.get('#username').type('test_user');
			cy.get('#password').type('wrong_password');
			cy.get('#login-button').click();

			cy.get('.error').contains('Wrong credentials');
			cy
				.get('.error')
				.should('have.css', 'color', 'rgb(255, 0, 0)');
			cy
				.get('.error')
				.should(
					'have.css',
					'border',
					'4px solid rgb(255, 0, 0)'
				);
		});
	});

	describe("When logged in and another user's blog exists", function() {
		beforeEach(function() {
			///// BYPASS THE UI!!
			cy.login({
				username : 'test_user_2',
				password : 'secret'
			});

			cy.createBlog({
				title  : 'test title 2',
				author : 'test author 2',
				url    : 'www.test.com 2'
			});

			localStorage.clear();

			cy.login({
				username : 'test_user',
				password : 'abc123'
			});
		});

		it('A new blog can be created', function() {
			cy.contains('new note').click();
			cy.get('#title').type('test title');
			cy.get('#author').type('test author');
			cy.get('#url').type('www.test.com');
			cy.contains('create').click();

			cy.contains('test title');
			cy.contains('test author');
			cy
				.get('.success')
				.should(
					'contain',
					'a new blog test title by test author was created'
				);
			cy
				.get('.success')
				.should('have.css', 'color', 'rgb(0, 128, 0)');
			cy
				.get('.success')
				.should('have.css', 'color', 'rgb(0, 128, 0)');
		});

		describe('and a note exists', function() {
			beforeEach(function() {
				cy.createBlog({
					title  : 'test title',
					author : 'test author',
					url    : 'www.test.com'
				});
			});

			it('should be able to add a like', function() {
				cy.contains('view').click();
				cy.contains('like').click();

				cy.get('#likes').should('contain', '1');

				cy.contains('like').click();

				cy.get('#likes').should('contain', '2');
			});

			it('user can delete their own blog', function() {
				cy.createBlog({
					title  : 'test title 3',
					author : 'test author 3',
					url    : 'www.test.com 3'
				});
				cy
					.contains('test title 3')
					.contains('view')
					.click();
				cy.get('#delete').click();

				cy.contains(
					'the blog test title 3 has been deleted'
				);
				cy
					.get('#blog-list')
					.should('not.contain', 'test title 3');
			});

			it("user cannot delete another user's blog", function() {
				cy
					.contains('test title 2')
					.contains('view')
					.click();
				cy.get('#delete').should('not.exist');
			});

			it.only(
				'blogs are ordered according to number of likes',
				function() {
					cy
						.request(
							'GET',
							'http://localhost:3001/api/blogs'
						)
						.then(response => {
							const test1 = response.body[0];
							const test2 = response.body[1];
							console.log('blogs:', test1, test2);

							cy.likeBlog(test2);

							cy
								.get('.blog-listing')
								.first()
								.contains('test title test author');

							cy.likeBlog(test1);
							cy.likeBlog({ ...test1, likes: 1 });

							cy
								.get('.blog-listing')
								.first()
								.contains('test title 2 test author 2');
						});

					//////BYPASS UI!!!!
					// cy
					// 	.contains('test title test author')
					// 	.contains('view')
					// 	.click();
				}
			);
		});
	});
});
