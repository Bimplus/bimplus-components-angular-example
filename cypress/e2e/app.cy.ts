describe('template spec', () => {

  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'));
  });

  afterEach(() => {
  });

  it('starts the app', () => {
    cy.isAppVisible();
    cy.isTopNavbarVisible();
    cy.isMainMenuVisible();
  });

  it('has the correct app title', () => {
    const title = Cypress.env('appTitle');
    cy.title().should('contain', title);
    // usage of cypress-testing-library command (showcase)
    cy.findByText(title).should('exist');
  })

})