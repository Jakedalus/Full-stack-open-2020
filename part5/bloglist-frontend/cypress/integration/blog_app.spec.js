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
});
