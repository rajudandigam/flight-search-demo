import 'cypress-axe';
import { mount } from 'cypress/react';
import '@testing-library/cypress/add-commands';
import 'cypress-real-events/support';
import '../../index.css';
import './commands'

declare global {
  namespace Cypress { interface Chainable { mount: typeof mount; checkComponentA11y(): void } }
}
Cypress.Commands.add('mount', mount);

Cypress.Commands.add('checkComponentA11y', () => {
  cy.injectAxe();
  cy.checkA11y('[data-cy-root]', {
    rules: {
      'region': { enabled: false },
      'page-has-heading-one': { enabled: false },
    },
  });
});
