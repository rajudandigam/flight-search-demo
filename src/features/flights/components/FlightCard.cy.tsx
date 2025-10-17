import * as stories from './FlightCard.stories';
import { composeStories } from '@storybook/react-vite';

const { Default, WithBaggageNote, CorporateFareLocked, LongHaul } = composeStories(stories);

describe('FlightCard (CT)', () => {
  beforeEach(() => {
    cy.viewport(1200, 800);
    cy.clock(Date.now(), ['Date']);
  });

  it('renders basic flight info', () => {
    cy.mount(<Default />);
    cy.contains(/United/i).should('exist');
    cy.contains(/USD/i).should('exist');
    cy.checkComponentA11y();
  });

  it('fare details modal open/close', () => {
    cy.mount(<Default />);
    cy.getByTestId('fare-details-button').click();
    cy.getByTestId('fare-modal').should('exist');
    cy.realPress('Escape');
    cy.getByTestId('fare-modal').should('not.exist');
  });

  it('badges & dynamic content', () => {
    cy.mount(<WithBaggageNote />);
    cy.contains(/carry-on|checked bag/i).should('exist');

    cy.mount(<CorporateFareLocked />);
    cy.contains(/Corporate/i).should('exist');

    cy.mount(<LongHaul />);
    cy.contains(/Long-haul/i).should('exist');
  });
});
