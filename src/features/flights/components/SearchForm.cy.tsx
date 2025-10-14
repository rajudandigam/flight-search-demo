import * as stories from './SearchForm.stories';
import { composeStories } from '@storybook/react-vite';
import 'cypress-axe';

const {
  Default,
  InvalidInputs,
  CorpPolicyBanner,
  RoundTrip,
  MultiCityDisabled,
  WithPrefilledUserContext,
} = composeStories(stories);

describe('SearchForm (Cypress CT)', () => {
  beforeEach(() => {
    cy.clock(Date.now(), ['Date']);
  });

  it('Default: no errors initially; errors appear only after submit', () => {
    cy.mount(<Default />);
    cy.findByRole('alert').should('not.exist');

    cy.findByRole('button', { name: /search flights/i }).click();

    cy.findByRole('alert', { timeout: 2000 }).should('exist');
    cy.findByText(/From is required/i).should('exist');
    cy.findByText(/To is required/i).should('exist');

    cy.injectAxe();
    cy.checkA11y(undefined, { runOnly: { type: 'tag', values: ['wcag2a'] } });
  });

  it('InvalidInputs: respects native min validation, then shows custom errors after fixing pax', () => {
    cy.mount(<InvalidInputs />);

    cy.findByLabelText(/Passengers/i)
      .should('have.attr', 'min', '1')
      .should('match', ':invalid')
      .then(($el) => {
        const input = $el[0] as HTMLInputElement;
        expect(input.validity.rangeUnderflow, 'rangeUnderflow').to.be.true;
        expect(input.checkValidity(), 'checkValidity').to.be.false;
      });
    cy.findByLabelText(/Passengers/i).clear().type('1');

    cy.findByRole('button', { name: /search flights/i }).click();

    cy.findByRole('alert', { timeout: 6000 }).within(() => {
      cy.contains(/cannot match/i).should('exist');
      cy.contains(/cannot be in the past/i).should('exist');
      cy.contains(/at least 1/i).should('not.exist');
    });
  });


  it('CorpPolicyBanner: visible banner, errors only after submit', () => {
    cy.mount(<CorpPolicyBanner />);

    cy.get('[role="status"]')
      .should('exist')
      .and('include.text', 'Corporate policy');

    cy.findByRole('alert').should('not.exist');

    cy.findByRole('button', { name: /search flights/i }).click();
    cy.findByRole('alert', { timeout: 2000 }).should('exist');
  });

  it('Trip types toggle; form becomes valid when fields filled', () => {
    cy.mount(<RoundTrip />);
    cy.findByLabelText(/From/i).type('SFO');
    cy.findByLabelText(/To/i).type('JFK');
    cy.findByRole('button', { name: /search flights/i }).click();
    cy.findByRole('alert').should('not.exist');
  });

  it('Multi-city disabled by policy', () => {
    cy.mount(<MultiCityDisabled />);
    cy.findByRole('radio', { name: /multi-city/i }).should('be.disabled');
  });

  it('WithPrefilledUserContext: valid submit triggers onSubmit', () => {
    const onSubmit = cy.stub().as('onSubmit');
    cy.mount(<WithPrefilledUserContext onSubmit={onSubmit} />);
    cy.findByRole('button', { name: /search flights/i }).click();
    cy.findByRole('alert').should('not.exist');
    cy.get('@onSubmit').should('have.been.calledOnce');
  });
});
