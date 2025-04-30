describe('top navbar spec', () => {

  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'))
  });

  afterEach(() => {
  });

  it('show the error dialog', () => {
    cy.get("lib-bimplus-navbar")
      .find("#error-button")
      .should('be.visible')
      .click();

    cy.get("app-general-overlay-dialog")
      .shadow()
      .find("lib-bimplus-overlay-dialog-error")
      .shadow()
      .find(".overlay-dialog-container")
      .should('be.visible');

    cy.get("app-general-overlay-dialog")
      .shadow()
      .find("lib-bimplus-overlay-dialog-error")
      .shadow()
      .find(".overlay-dialog-container_title_msg")
      .should('be.visible')
      .and('contain.text', 'Error');

    cy.get("app-general-overlay-dialog")
      .shadow()
      .find("lib-bimplus-overlay-dialog-error")
      .shadow()
      .find(".overlay-dialog-container_content_msg")
      .should('be.visible')
      .and('contain.text', 'This is a message.');

    cy.get("app-general-overlay-dialog")
      .shadow()
      .find("lib-bimplus-overlay-dialog-error")
      .shadow()
      .find("lib-bimplus-buttons-row")
      .shadow()
      .find('.primary-button')
      .click();
  });

  it('show the warning dialog', () => {
    cy.get("lib-bimplus-navbar")
      .find("#warning-button")
      .should('be.visible')
      .click();

    cy.get("app-general-overlay-dialog")
      .shadow()
      .find("lib-bimplus-overlay-dialog-warning")
      .shadow()
      .find(".overlay-dialog-container")
      .should('be.visible');

    cy.get("app-general-overlay-dialog")
      .shadow()
      .find("lib-bimplus-overlay-dialog-warning")
      .shadow()
      .find(".overlay-dialog-container_title_msg")
      .should('be.visible')
      .and('contain.text', 'Warning');

    cy.get("app-general-overlay-dialog")
      .shadow()
      .find("lib-bimplus-overlay-dialog-warning")
      .shadow()
      .find(".overlay-dialog-container_content_msg")
      .should('be.visible')
      .and('contain.text', 'This is a message.');

    cy.get("app-general-overlay-dialog")
      .shadow()
      .find("lib-bimplus-overlay-dialog-warning")
      .shadow()
      .find("lib-bimplus-buttons-row")
      .shadow()
      .find('.primary-button')
      .click();
  });

  it('show the confirm dialog', () => {
    cy.get("lib-bimplus-navbar")
      .find("#confirm-button")
      .should('be.visible')
      .click();

    cy.get("app-general-overlay-dialog")
      .shadow()
      .find("lib-bimplus-overlay-dialog-confirm")
      .shadow()
      .find(".overlay-dialog-container")
      .should('be.visible');

    cy.get("app-general-overlay-dialog")
      .shadow()
      .find("lib-bimplus-overlay-dialog-confirm")
      .shadow()
      .find(".title-text")
      .should('be.visible')
      .and('contain.text', 'Confirm');

    cy.get("app-general-overlay-dialog")
      .shadow()
      .find("lib-bimplus-overlay-dialog-confirm")
      .shadow()
      .find(".text")
      .should('be.visible')
      .and('contain.text', 'This is a message.');

    cy.get("app-general-overlay-dialog")
      .shadow()
      .find("lib-bimplus-overlay-dialog-confirm")
      .shadow()
      .find("lib-bimplus-buttons-row")
      .shadow()
      .find('.primary-button')
      .click();
  });

  it('show the delete dialog', () => {
    cy.get("lib-bimplus-navbar")
      .find("#delete-button")
      .should('be.visible')
      .click();

    cy.get("app-general-overlay-dialog")
      .shadow()
      .find("lib-bimplus-overlay-dialog-delete")
      .shadow()
      .find(".overlay-dialog-container")
      .should('be.visible');

    cy.get("app-general-overlay-dialog")
      .shadow()
      .find("lib-bimplus-overlay-dialog-delete")
      .shadow()
      .find(".overlay-dialog-container_title_msg")
      .should('be.visible')
      .and('contain.text', 'Delete');

    cy.get("app-general-overlay-dialog")
      .shadow()
      .find("lib-bimplus-overlay-dialog-delete")
      .shadow()
      .find(".overlay-dialog-container_content_msg")
      .should('be.visible')
      .and('contain.text', 'This is a message.');

    cy.get("app-general-overlay-dialog")
      .shadow()
      .find("lib-bimplus-overlay-dialog-delete")
      .shadow()
      .find("lib-bimplus-buttons-row")
      .shadow()
      .find('.primary-button')
      .click();
  });

})