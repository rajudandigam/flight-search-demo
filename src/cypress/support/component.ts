import { mount } from 'cypress/react';
import '@testing-library/cypress/add-commands';
import 'cypress-axe';
import '../../index.css';

declare global { namespace Cypress { interface Chainable { mount: typeof mount } } }
Cypress.Commands.add('mount', mount);
