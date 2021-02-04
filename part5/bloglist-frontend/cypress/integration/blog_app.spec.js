describe('Blog App', function() {
	beforeEach(function() {
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
