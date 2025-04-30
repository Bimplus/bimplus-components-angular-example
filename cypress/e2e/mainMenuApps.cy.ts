describe('side navbar spec', () => {

  const appItems = [
    { id: 'portalBimUsers', label: 'Members', iconClass: 'bim-mm-icon-users' },
    { id: 'portalBimModels', label: 'Models', iconClass: 'bim-mm-icon-models' },
    { id: 'portalBimDocuments', label: 'Documents', iconClass: 'bim-mm-icon-documents' },
    { id: 'portalBimProjectSettings', label: 'Settings', iconClass: 'bim-mm-icon-project-settings' },
    { id: 'portalBimProcesses', label: 'Approvals', iconClass: 'bim-mm-icon-processes' },
    { id: 'portalBimViewerBtn', label: 'BIM Explorer', iconClass: 'bim-mm-icon-bim-explorer' },
    { id: 'portalCloudViewerBtn', label: 'Model Viewer', iconClass: 'bim-mm-icon-cloud-viewer' },
    { id: 'portalConnexisBtn', label: 'Connexis', iconClass: 'bim-mm-icon-connexis' },
    { id: 'portalBimAutoconverterBtn', label: 'Autoconverter', iconClass: 'bim-mm-icon-autoconverter', active: true },
    { id: 'portalTeamManagementBtn', label: 'Team members', iconClass: 'bim-mm-icon-team-members', active: true },
    { id: 'portalPropertyManagerBtn', label: 'Property manager', iconClass: 'bim-mm-icon-property-manager', active: true },
    { id: 'portalAddInsBtn', label: 'Add-Ins', iconClass: 'bim-mm-icon-add-ins' },
    { id: 'portalShopBtn', label: 'Get More', iconClass: 'bim-mm-icon-shop' },
  ];

  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'))
  });

  afterEach(() => { });

  appItems.forEach(({ id, label, iconClass, active }) => {
    it(`should render menu item "${label}" with correct icon`, () => {
      cy.get('lib-bimplus-main-menu')
        .shadow()
        .find(`#${id}`)
        .should('exist')
        .within(() => {
          cy.get('.bim-mm-icon')
            .should('have.class', iconClass);

          cy.get('span').should('have.text', label);

          if (active) {
            cy.get('.bim-mm-app-item-details .bim-mm-icon').should('have.class', 'active');
          }
        });
    });

    it(`should allow clicking the "${label}" menu item`, () => {
      cy.get('lib-bimplus-main-menu')
        .shadow()
        .find(`#${id}`)
        .click({ force: true }); // force in case hover is required

      // Insert post-click assertions here if navigation or modal expected
    });
  });
});  
