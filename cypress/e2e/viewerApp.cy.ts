describe('template spec', () => {

  beforeEach(() => {
    // cy.visit(`${Cypress.env('baseUrl')}/viewer`);
    cy.visit(Cypress.env('baseUrl'));
  });

  afterEach(() => {
  });

  it('has a hidden viewer app', () => {
    cy.isViewerAppHidden();
  });

  it('has a visible viewer app when BimExplorer is started', () => {
    cy.toggleViewerApp();
    cy.isAppViewerVisible();
    cy.isToolHubVisible();
    cy.isProjectNavigatorVisible();
    cy.toggleViewerApp();
  });

  it('toggle project navigator', () => {
    cy.toggleViewerApp();
    cy.isAppViewerVisible();

    cy.isToolHubVisible();
    cy.isProjectNavigatorVisible();

    cy.toggleProjectNavigator();
    cy.isProjectNavigatorPassive();
    cy.isProjectNavigatorHidden();

    cy.toggleProjectNavigator();
    cy.isProjectNavigatorActive();
    cy.isProjectNavigatorVisible();

    cy.toggleViewerApp();
  });

  it('toggle tool hub', () => {
    cy.toggleViewerApp();
    cy.isAppViewerVisible();
    cy.isToolHubVisible();

    // Verify that a specific button within the menu is visible and click it
    cy.get("lib-bimplus-tool-hub")
      .shadow()
      .find('[data-test="toolhub_controller"]')
      .should('have.class', 'opened') // opened
      .click(); // Perform the click event

    cy.get("lib-bimplus-tool-hub")
      .shadow()
      .find('[data-test="toolhub_controller"]')
      .should('not.have.class', 'opened') // not opened
      .click(); // Perform the click event

    cy.get("lib-bimplus-tool-hub")
      .shadow()
      .find('[data-test="toolhub_controller"]')
      .should('have.class', 'opened') // again opened

    cy.toggleViewerApp();
  })

})