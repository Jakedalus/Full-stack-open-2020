describe('Blog App', function() {
	beforeEach(function() {
		cy.request(
			'POST',
			'http://localhost:3001/api/testing/reset'
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
});
