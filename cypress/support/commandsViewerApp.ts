Cypress.Commands.add('toggleViewerApp', () => {
  cy.get('lib-bimplus-main-menu')
    .shadow()
    .find(`#portalBimViewerBtn`)
    .click();
});

Cypress.Commands.add('isViewerAppHidden', () => {
  cy.document().then((doc) => {
    expect(doc.querySelector('app-viewer')).to.be.null;
  });
});

Cypress.Commands.add('isAppViewerVisible', () => {
  cy.get("app-viewer")
    .should('be.visible');
});

//======================================================
Cypress.Commands.add('isToolHubVisible', () => {
  cy.get("lib-bimplus-tool-hub")
    .shadow()
    .find('#center-menu-fp-id')
    .should('be.visible');
});

Cypress.Commands.add('isToolHubHidden', () => {
  cy.get("lib-bimplus-tool-hub")
    .shadow()
    .find('#center-menu-fp-id')
    .should('not.be.visible');
});

//======================================================
Cypress.Commands.add('isProjectNavigatorVisible', () => {
  cy.get("lib-bimplus-floating-bar-project-navigator")
    .shadow()
    .find(".floating-bar-header-logo")
    .should('be.visible');
});

Cypress.Commands.add('isProjectNavigatorHidden', () => {
  cy.document().then((doc) => {
    expect(doc.querySelector('lib-bimplus-floating-bar-project-navigator')).to.be.null;
  });
});

Cypress.Commands.add('toggleProjectNavigator', () => {
  cy.get("lib-bimplus-tool-hub")
    .shadow()
    .find('div.ui-icon-project-navigator')
    .should('have.class', 'enabled')
    .click();
});

Cypress.Commands.add('isProjectNavigatorActive', () => {
  cy.get("lib-bimplus-tool-hub")
    .shadow()
    .find('div.ui-icon-project-navigator')
    .should('have.class', 'enabled')
    .should('have.class', 'active');
});

Cypress.Commands.add('isProjectNavigatorPassive', () => {
  cy.get("lib-bimplus-tool-hub")
    .shadow()
    .find('div.ui-icon-project-navigator')
    .should('have.class', 'enabled')
    .should('not.have.class', 'active');
});
