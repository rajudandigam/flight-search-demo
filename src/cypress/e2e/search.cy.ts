describe('Flight search flow', () => {
  it('goes Home -> Results and loads mocked flights', () => {
    cy.visit('/');
    cy.findByLabelText(/From/i).clear().type('SFO');
    cy.findByLabelText(/To/i).clear().type('JFK');
    cy.findByRole('button', { name: /search flights/i }).click();
    cy.url().should('include', '/results');
    cy.contains(/United/).should('exist');
  });
});
