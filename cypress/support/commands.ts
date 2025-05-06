// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import '@testing-library/cypress/add-commands' // for .findBy .queryBy commands
import 'cypress-shadow-dom'; // for .shadow chaining command


Cypress.Commands.add('disableAnimations', () => {
  cy.document().then((doc) => {
    const style = doc.createElement('style');
    style.innerHTML = `
      *,
      *::before,
      *::after {
        transition: none !important;
        animation: none !important;
      }
    `;
    doc.head.appendChild(style);
  });
});