describe('Flight search flow (E2E)', () => {
  beforeEach(() => {
    cy.clock(Date.now(), ['Date']);
    cy.stubFlightsSearch('searchFlights');

    cy.request({
      url: '/',
      retryOnNetworkFailure: true,
      retryOnStatusCodeFailure: true,
    });
  });

  it('Home → Results → select a flight', () => {
    cy.visit('/', {
      retryOnNetworkFailure: true,
      retryOnStatusCodeFailure: true,
    });

    cy.flowFillSearchForm({ from: 'SFO', to: 'JFK', pax: 1, cabin: 'ECONOMY' });
    cy.flowSubmitSearch();

    cy.url().should('include', '/results');
    cy.wait('@searchFlights', { timeout: 5000 });

    cy.get('[data-cy^="flight-card-"]').first().within(() => {
      cy.getByTestId('select-button').click();
    });
  });
});
