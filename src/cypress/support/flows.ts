export function registerFlows() {
  Cypress.Commands.add('flowFillSearchForm', (data: { from: string; to: string; depart?: string; pax?: number; cabin?: string }) => {
    cy.getByTestId('from-input').clear().type(data.from);
    cy.getByTestId('to-input').clear().type(data.to);
    if (data.depart) cy.getByTestId('depart-input').clear().type(data.depart);
    if (data.pax) cy.getByTestId('pax-input').clear().type(String(data.pax));
    if (data.cabin) cy.getByTestId('cabin-select').select(data.cabin);
  });

  Cypress.Commands.add('flowSubmitSearch', () => {
    cy.getByTestId('search-button').click();
  });

  Cypress.Commands.add('flowOpenFareDetails', () => {
    cy.getByTestId('fare-details-button').click();
  });
}
