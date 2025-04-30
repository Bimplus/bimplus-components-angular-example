// cypress/support/index.d.ts
// Define typescript types here to solve ESLint errors

declare namespace Cypress {
  interface Chainable {
    // Add typescript declarations for @testing-library/cypress
    findByText(arg1: string): Chainable<Element>;

    // Application commands
    isAppVisible(): Chainable<Element>;
    isTopNavbarVisible(): Chainable<Element>;
    isMainMenuVisible(): Chainable<Element>;

    // Viewer app commands
    toggleViewerApp(): Chainable<Element>;
    isAppViewerVisible(): Chainable<Element>;
    isViewerAppHidden(): Chainable<Element>;
    // Tool hub commands
    isToolHubVisible(): Chainable<Element>;
    isToolHubHidden(): Chainable<Element>;
    // Project navigator commands
    toggleProjectNavigator(): Chainable<Element>;
    isProjectNavigatorVisible(): Chainable<Element>;
    isProjectNavigatorHidden(): Chainable<Element>;
    isProjectNavigatorActive(): Chainable<Element>;
    isProjectNavigatorPassive(): Chainable<Element>;
  }

  // https://www.youtube.com/watch?v=iX5EKZtKKvQ
  // Remove Typescript errors for Cypress.AUTWindow
  interface UserCentricsUI {
    acceptAllConsents?: () => void;
    closeCMP?: () => void;
  }
  interface ApplicationWindow {
    UC_UI?: UserCentricsUI;
  }
}