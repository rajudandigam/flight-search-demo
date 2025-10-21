import { buildFlights } from '../fixtures/flights';

export function stubFlightsSearch(alias = 'searchFlights', opts?: { params?: Record<string, any>; count?: number }) {
  const flights = buildFlights(opts?.params, opts?.count ?? 4);

  cy.intercept('POST', '/api/flights/search', {
    statusCode: 200,
    body: { flights },
  }).as(alias);

  return cy.wrap({ alias, flights }, { log: false });
}
