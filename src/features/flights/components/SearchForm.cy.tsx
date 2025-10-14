import * as stories from './SearchForm.stories';
import { composeStories } from '@storybook/react-vite';


const { Default, InvalidInputs, CorpPolicyBanner, OneWay, RoundTrip, MultiCityDisabled, WithPrefilledUserContext, RTL_Default } = composeStories(stories);

describe('SearchForm stories', () => {

  beforeEach(() => {
    cy.clock(Date.now(), ['Date']);
    cy.injectAxe?.();
  });

  it('Default: button disabled until valid', () => {
    cy.mount(<Default />);
    cy.findByRole('button', { name: /search flights/i }).should('be.disabled');
    cy.findByLabelText(/From/i).type('SFO');
    cy.findByLabelText(/To/i).type('JFK');
    cy.findByRole('button', { name: /search flights/i }).should('not.be.disabled');
    cy.checkA11y?.();
  });

  it('InvalidInputs: shows validation and keeps submit disabled', () => {
    cy.mount(<InvalidInputs />);
    cy.findByRole('alert').within(() => {
      cy.contains(/cannot be in the past/i);
      cy.contains(/cannot match/i);
      cy.contains(/at least 1/i);
    });
    cy.findByRole('button', { name: /search flights/i }).should('be.disabled');
    cy.checkA11y?.();
  });

  it('CorpPolicyBanner visible and announced', () => {
    cy.mount(<CorpPolicyBanner />);
    cy.findByRole('status').should('be.visible').and('contain.text', /corporate policy/i);
    cy.checkA11y?.();
  });

  it('Trip type radios toggle via keyboard only', () => {
    cy.mount(<RoundTrip />);
    cy.realPress('Tab');
    cy.findByLabelText(/From/i).type('SFO');
    cy.findByLabelText(/To/i).type('JFK');
    cy.findByRole('radio', { name: /round-trip/i }).focus().type('{space}');
    cy.findByRole('radio', { name: /round-trip/i }).should('be.checked');
  });

  it('MultiCityDisabled: radio disabled', () => {
    cy.mount(<MultiCityDisabled />);
    cy.findByRole('radio', { name: /multi-city/i }).should('be.disabled');
  });

  it('WithPrefilledUserContext: prefilled fields', () => {
    cy.mount(<WithPrefilledUserContext />);
    cy.findByLabelText(/From/i).should('have.value', 'SFO');
    cy.findByLabelText(/Passengers/i).should('have.value', '2');
    cy.findByLabelText(/Cabin/i).should('have.value', 'PREMIUM_ECONOMY');
  });

  it('RTL_Default: renders with dir=rtl', () => {
    cy.mount(<RTL_Default />);
    cy.get('form[aria-label="Flight Search Form"]').should('have.attr', 'dir', 'rtl');
  });
});
