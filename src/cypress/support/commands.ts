import 'cypress-axe';
import 'cypress-real-events/support';

import { registerFlows } from './flows';
import { registerA11yCommands } from './a11y';
import { stubFlightsSearch as _stubFlightsSearch } from './network';

Cypress.Commands.add('getByTestId', (id: string) => {
  return cy.get(`[data-cy="${id}"]`);
});

Cypress.Commands.add('stubFlightsSearch', (alias = 'searchFlights', opts?: { params?: any; count?: number }) => {
  return _stubFlightsSearch(alias, opts);
});

registerFlows();
registerA11yCommands();

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(id: string): Chainable<JQuery<HTMLElement>>;

      flowFillSearchForm(data: { from: string; to: string; depart?: string; pax?: number; cabin?: string }): Chainable<void>;
      flowSubmitSearch(): Chainable<void>;
      flowOpenFareDetails(): Chainable<void>;

      checkComponentA11y(options?: any): Chainable<void>;

      stubFlightsSearch(alias?: string, opts?: { params?: any; count?: number }): any;
    }
  }
}
