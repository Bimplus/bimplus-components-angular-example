Cypress.Commands.add('isAppVisible', () => {
  cy.get("app-root")
    .should('be.visible');
});

Cypress.Commands.add('isTopNavbarVisible', () => {
  cy.get("lib-bimplus-navbar")
    .should('be.visible');
});

Cypress.Commands.add('isMainMenuVisible', () => {
  cy.get("lib-bimplus-main-menu")
    .should('be.visible')
    // .should('have.attr', 'ng-reflect-is-collapsed', 'false');
});

