describe('Blog App', function() {
	it('front page can be opened', function() {
		cy.visit('http://localhost:3000');
		cy.contains('Blogs');
	});
});
