describe('Blog App', function() {
	const user = {
		username : 'test_user',
		name     : 'Francis Bacon',
		password : 'abc123',
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
			user
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

			cy.contains(`${user.name} is logged in`);
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

	describe('When logged in', function() {
		beforeEach(function() {
			///// BYPASS THE UI!!

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

			it.only('should be able to add a like', function() {
				cy.contains('view').click();
				cy.contains('like').click();

				cy.get('#likes').should('contain', '1');

				cy.contains('like').click();

				cy.get('#likes').should('contain', '2');
			});
		});
	});
});
