export function registerA11yCommands() {
  Cypress.Commands.add('checkComponentA11y', (options?: any) => {
    cy.injectAxe();
    cy.checkA11y(undefined, options ?? { includedImpacts: ['critical', 'serious'] });
  });
}
