import * as stories from './SearchForm.stories';
import { composeStories } from '@storybook/react-vite';

const { Default, InvalidInputs, CorpPolicyBanner, RoundTrip, MultiCityDisabled, WithPrefilledUserContext } = composeStories(stories);

describe('SearchForm (CT)', () => {
  beforeEach(() => {
    cy.clock(Date.now(), ['Date']);
  });

  it('Default: shows errors only after submit', () => {
    cy.mount(<Default />);
    cy.getByTestId('form-alert').should('not.exist');
    cy.flowSubmitSearch();
    cy.getByTestId('form-alert').should('exist');
    cy.checkComponentA11y();
  });

  it('InvalidInputs: native + custom validation', () => {
    cy.mount(<InvalidInputs />);
    cy.getByTestId('pax-input')
      .should('have.attr', 'min', '1')
      .should('match', ':invalid');
    cy.getByTestId('pax-input').clear().type('1');
    cy.flowSubmitSearch();
    cy.getByTestId('form-alert').should('exist');
  });

  it('CorpPolicyBanner present; errors after submit', () => {
    cy.mount(<CorpPolicyBanner />);
    cy.get('[role="status"]').should('include.text', 'Corporate policy');
    cy.flowSubmitSearch();
    cy.getByTestId('form-alert').should('exist');
  });

  it('RoundTrip becomes valid when fields filled', () => {
    cy.mount(<RoundTrip />);
    cy.flowFillSearchForm({ from: 'SFO', to: 'JFK' });
    cy.flowSubmitSearch();
    cy.getByTestId('form-alert').should('not.exist');
  });

  it('MultiCity disabled', () => {
    cy.mount(<MultiCityDisabled />);
    cy.findByRole('radio', { name: /multi-city/i }).should('be.disabled');
  });

  it('WithPrefilledUserContext triggers onSubmit', () => {
    const onSubmit = cy.stub().as('onSubmit');
    cy.mount(<WithPrefilledUserContext onSubmit={onSubmit} />);
    cy.flowSubmitSearch();
    cy.getByTestId('form-alert').should('not.exist');
    cy.get('@onSubmit').should('have.been.calledOnce');
  });
});
