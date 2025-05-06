describe('main menu navbar spec', () => {

  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'))
  });

  afterEach(() => { });

  it('has a visible main menu', () => {
    cy.isAppVisible();
    cy.isMainMenuVisible();
  });

  it('toggles the main menu bar with hamburger button', () => {
    cy.get("lib-bimplus-navbar")
      .as('navbar');

    // Initial state should be closed
    cy.get('@navbar')
      .should('have.attr', 'ng-reflect-is-navbar-menu-active', 'true');

    // Click hamburger icon to open
    cy.get('@navbar')
      .shadow()
      .find('.bimplus-navbar-menu')
      .click();

    // Assert it's open
    cy.get('@navbar')
      .should('have.attr', 'ng-reflect-is-navbar-menu-active', 'false');

    // Click again to close
    cy.get('@navbar')
      .shadow()
      .find('.bimplus-navbar-menu')
      .click();

    // Assert it's closed
    cy.get('@navbar')
      .should('have.attr', 'ng-reflect-is-navbar-menu-active', 'true');
  });

  it('should display the Open project item with correct icon and label', () => {
    cy.get('lib-bimplus-main-menu')
      .shadow()
      .find('.bim-mm-app-item-details')
      .should('exist')
      .find('.bim-mm-icon')
      .should('exist')
      .and('have.class', 'bim-mm-icon-folder');

    cy.get('lib-bimplus-main-menu')
      .shadow()
      .find('.bim-mm-app-item-details')
      .should('exist')
      .find('span')
      .should('exist')
      .and('be.visible');
  });

  it('displays correct project name and image', () => {
    cy.get('lib-bimplus-main-menu')
      .should('have.attr', 'ng-reflect-project-name', '00 Quickstart project')
      .and('have.attr', 'ng-reflect-project-image-url')
      .and('contain', 'https://encrypted-tbn0.gstatic');

    cy.get('lib-bimplus-main-menu')
      .shadow()
      .find('lib-bimplus-project-menu')
      .shadow()
      .find('.bim-pm-prj-name')
      .should('contain.text', '00 Quickstart project');
  });
});
