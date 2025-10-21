describe('Flight search flow (E2E)', () => {
  beforeEach(() => {
    cy.clock(Date.now(), ['Date']);

    cy.stubFlightsSearch('searchFlights').then(({ flights }) => {
      cy.wrap(flights[0]).as('firstFlight');
    });

    cy.request({ url: '/', retryOnNetworkFailure: true, retryOnStatusCodeFailure: true });
  });

  it('Home → Results → Checkout → verify prefilled & book CTA', () => {
    cy.visit('/', { retryOnNetworkFailure: true, retryOnStatusCodeFailure: true });

    cy.flowFillSearchForm({ from: 'SFO', to: 'JFK', pax: 1, cabin: 'ECONOMY' });
    cy.flowSubmitSearch();

    cy.url().should('include', '/results');
    cy.wait('@searchFlights', { timeout: 12000 });

    cy.get('[data-cy^="flight-card-"]').first().within(() => {
      cy.getByTestId('select-button').click();
    });

    cy.url().should('include', '/checkout');

    // Replace your current @firstFlight assertion block with:
    cy.get('@firstFlight').then((f: any) => {
      // Scope to DESKTOP summary in the sidebar <aside>
      cy.get('aside')
        .find('div.panel-header')
        .contains('Trip summary')
        .parents('.panel')
        .as('summary');

      cy.get('@summary').should('be.visible');

      // Carrier + flight number
      cy.get('@summary')
        .find('.panel-body')
        .contains(new RegExp(`${f.carrier}\\s*•\\s*#${f.id}`))
        .should('be.visible');

      // Route
      cy.get('@summary')
        .find('.panel-body')
        .contains(`${f.from} → ${f.to}`)
        .should('be.visible');

      // Total price
      cy.get('@summary')
        .find('.panel-body')
        .contains(new RegExp(`\\b${f.currency}\\s*${Math.round(f.price)}\\b`))
        .scrollIntoView()
        .should('be.visible');
    });


    cy.getByTestId('passenger-first').should('have.value', 'Raju');
    cy.getByTestId('passenger-last').should('have.value', 'Dandigam');
    cy.getByTestId('passenger-dob').should('have.value', '1990-01-01');
    cy.getByTestId('passenger-email').should('have.value', 'raju@example.com');

    cy.getByTestId('card-number').should('have.value', '**** 4242');
    cy.getByTestId('card-name').should('have.value', 'Raju Dandigam');
    cy.getByTestId('card-exp').should('have.value', '12/28');
    cy.getByTestId('card-cvc').should('have.value', '123');

    cy.getByTestId('book-button').should('be.visible').and('not.be.disabled');
  });
});
