import * as stories from './FlightCard.stories';
import { composeStories } from '@storybook/react-vite';
import 'cypress-axe';

const {
  Default,
  WithBaggageNote,
  OneStop,
  CorporateFareLocked,
  LongHaul,
} = composeStories(stories);

describe('FlightCard (Cypress CT)', () => {
  beforeEach(() => {
    cy.viewport(1200, 800);
    cy.clock(Date.now(), ['Date']);
  });

  it('renders basic flight info', () => {
    cy.mount(<Default />);
    cy.contains(/United/i).should('exist');
    cy.contains(/USD/i).should('exist');
    cy.contains(/SFO/i).should('exist');
    cy.contains(/JFK/i).should('exist');
    cy.injectAxe();
    cy.checkComponentA11y();
  });

  it('shows baggage note when present', () => {
    cy.mount(<WithBaggageNote />);
    cy.contains(/Includes 1 checked bag/i).should('exist');
  });

  it('shows stops and duration properly', () => {
    cy.mount(<OneStop />);
    cy.contains(/1 stop/i).should('exist');
    cy.contains(/8h 40m|8h/i).should('exist');
  });

  it('renders corporate fare lock badge text', () => {
    cy.mount(<CorporateFareLocked />);
    cy.contains(/Corporate fare/i).should('exist');
  });

  it('renders long-haul flight with high price', () => {
    cy.mount(<LongHaul />);
    cy.contains(/USD 890/i).should('exist');
    cy.contains(/Singapore/i).should('exist');
  });
});
