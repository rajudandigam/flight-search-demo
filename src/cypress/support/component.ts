import 'cypress-axe';
import { mount } from 'cypress/react';
import '@testing-library/cypress/add-commands';
import '../../index.css';

declare global {
  namespace Cypress { interface Chainable { mount: typeof mount; checkComponentA11y(): void } }
}
Cypress.Commands.add('mount', mount);

// NEW: run axe only on the mounted root and disable page-level rules
Cypress.Commands.add('checkComponentA11y', () => {
  // Cypress component runner uses [data-cy-root] as the mount container
  cy.injectAxe();
  cy.checkA11y('[data-cy-root]', {
    rules: {
      // These expect full pages (landmarks, h1), not isolated components
      'region': { enabled: false },
      'page-has-heading-one': { enabled: false },
    },
  });
});
