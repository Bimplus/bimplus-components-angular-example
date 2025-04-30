describe('top navbar spec', () => {

  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'))
  });

  afterEach(() => {
  });

  it('has a bimplus logo', () => {
    cy.get("lib-bimplus-navbar")
      .shadow()
      .find(".bimplus-navbar-logo-container")
      .should('be.visible');
  });

  it('has a visible hamburger menu', () => {
    cy.get("lib-bimplus-navbar")
      .shadow()
      .find(".bimplus-navbar-menu")
      .should('be.visible');
  });

  it('has the correct contact link', () => {
    cy.get("lib-bimplus-contact")
      .shadow()
      .find('.bimplus-contact-link')
      .should('have.attr', 'href', 'https://www.allplan.com/info/contact');
  })

  it('has a touch menu', () => {
    cy.get("lib-bimplus-touch-menu")
      .should('be.visible');
  })

  it('should switch from desktop to touch and back to desktop', () => {
    cy.get('lib-bimplus-touch-menu')
      .should('have.attr', 'ng-reflect-selected-mode', 'desktop')

    cy.get('lib-bimplus-touch-menu')
      .should('have.attr', 'selectedmode', 'desktop')

    // 2. Click on the dropdown to open it
    cy.get('lib-bimplus-touch-menu').click()

    // 3. Click on the _Touch_Mode item
    cy.get("lib-bimplus-touch-menu")
      .shadow()
      .find('li.bimcomp-dropdown-menu-item')
      .contains('_Touch_Mode')
      .click()

    cy.get('lib-bimplus-touch-menu')
      .should('have.attr', 'selectedmode', 'touch')

    // 4. Click dropdown again
    cy.get('lib-bimplus-touch-menu').click()

    // 5. Click back on _Desktop_Mode
    cy.get("lib-bimplus-touch-menu")
      .shadow()
      .find('li.bimcomp-dropdown-menu-item')
      .contains('_Desktop_Mode')
      .click()

    cy.get('lib-bimplus-touch-menu')
      .should('have.attr', 'selectedmode', 'desktop')
  })

  it('has a language menu', () => {
    cy.get("lib-bimplus-language-menu")
      .should('be.visible');
  });

  it('should have selected language set to "en"', () => {
    cy.get('lib-bimplus-language-menu')
      .should('have.attr', 'ng-reflect-selected-language', 'en')
  })

  it('should show all defined languages in the language menu (shadow DOM)', () => {
    // Open the language menu inside Shadow DOM
    cy.get('lib-bimplus-language-menu')
      .click()

    // Get all count of languages (assuming they're <li> items in shadow DOM)
    cy.get('lib-bimplus-language-menu')
      .shadow()
      .find('li')
      .should('have.length', 10) // 10 languages defined in the menu

    // Check for all languages
    const languages = [
      'Čeština',
      'Deutsch',
      'English (UK)',
      'English (US)',
      'Español',
      'Français',
      'Italiano',
      'Русский',
      'Romana',
      'Türkçe',
    ]

    languages.forEach((lang) => {
      cy.get('lib-bimplus-language-menu')
        .shadow()
        .find(`[data-test="langmenu_item_${lang}"]`)
        .should('exist')
        .and('be.visible')
    })
  })

  it('has a user menu', () => {
    // Is a user menu defined ?
    cy.get("lib-bimplus-user-menu")
      .should('be.visible');
  });

  it('has correct user entries', () => {
    // Check info of user

    // email is ok
    cy.get("lib-bimplus-user-menu")
      .shadow()
      .find('.dropdown-toggle')
      .invoke('attr', 'title')
      .should('contain', Cypress.env('userEmail'));

    // real name is ok
    cy.get("lib-bimplus-user-menu")
      .shadow()
      .find('.dropdown-toggle')
      .find('.user-name')
      .should('contain.text', Cypress.env('userRealName'));

    // user image is ok
    cy.get('lib-bimplus-user-menu')
      .shadow()
      .find('.dropdown-toggle')
      .find('.user-photo')
      .should('have.attr', 'src')
      .and('contain', Cypress.env('userImageLink'));
  });

  it('has correct user dropdown sub-menues', () => {
    // Drop down is closed
    cy.get("lib-bimplus-user-menu")
      .shadow()
      .find('.bimcomp-dropdown-menu')
      .should('not.have.class', 'open');

    // Open the dropdown menu
    cy.get("lib-bimplus-user-menu")
      .click()

    // Drop down is closed
    cy.get("lib-bimplus-user-menu")
      .shadow()
      .find('.bimcomp-dropdown-menu')
      .should('have.class', 'open');

    // check existance of 8 li elements in the dropdown menu
    cy.get('lib-bimplus-user-menu')
      .shadow()
      .find('li')
      .should('have.length', 9); // 8 menus + 1 separator

    // Check sub menues
    cy.get("lib-bimplus-user-menu")
      .shadow()
      .find('li[key="accountSettingsPage"]')
      .should('exist')
      .find('div.icon-account-settings')
      .should('exist')
    cy.get("lib-bimplus-user-menu")
      .shadow()
      .find('li[key="accountSettingsPage"]')
      .should('exist')
      .find('span.menu-item-text')
      .should('contain.text', 'Edit profile');  // Verify the text content

    cy.get("lib-bimplus-user-menu")
      .shadow()
      .find('li[key="userGuideLink"]')
      .should('exist')
      .find('a')
      .should('have.attr', 'href', 'https://doc.allplan.com/display/BIMPLUSMANUAL/Bimplus+Benutzerhandbuch')
      .find('span.menu-item-text')
      .should('contain.text', 'User Guide');  // Verify the text content

    cy.get("lib-bimplus-user-menu")
      .shadow()
      .find('li[key="supportLink"]')
      .should('exist')
      .find('a')
      .should('have.attr', 'href', 'https://connect2.allplan.com/services/support?no_cache=1')
      .find('span.menu-item-text')
      .should('contain.text', 'Support');  // Verify the text content

    cy.get("lib-bimplus-user-menu")
      .shadow()
      .find('li[key="forumLink"]')
      .should('exist')
      .find('a')
      .should('have.attr', 'href', 'https://connect.allplan.com/de/forum/themen/bim-benutzer-forum.ct?L=0')  // Check the href attribute
      .and('have.attr', 'target', '_blank')  // Verify that it opens in a new tab
      .find('span.menu-item-text')
      .should('contain.text', 'Forum');  // Check that the text content is "Forum"

    cy.get("lib-bimplus-user-menu")
      .shadow()
      .find('li[key="releaseNotesLink"]')
      .should('exist')
      .and('have.class', 'submenu-hidden') // Optional: verify the submenu is hidden by default
      .find('span.menu-item-text')
      .should('contain.text', 'Release notes');

    cy.get("lib-bimplus-user-menu")
      .shadow()
      .find('li[key="languagesSubmenu"]')
      .should('exist')
      .and('have.class', 'languageMenuItem')  // Check that it has the 'languageMenuItem' class
      .find('div.icon-languages')
      .should('exist')  // Verify that the icon with the 'icon-languages' class is present
      .and('have.class', 'icon-languages');  // Ensure it has the correct icon class

    cy.get("lib-bimplus-user-menu")
      .shadow()
      .find('li[key="languagesSubmenu"]')
      .should('exist')
      .and('have.class', 'languageMenuItem')  // Verify it has the 'languageMenuItem' class
      .find('span.menu-item-text')
      .should('contain.text', 'Languages');  // Check that the text content is "Languages"

    // Verify the presence of the language submenu
    cy.get("lib-bimplus-user-menu")
      .shadow()
      .find('li[key="languagesSubmenu"]')
      .find('div.languagesSubmenu')
      .should('exist')
      .within(() => {
        // Check for each language option
        cy.get('#portalLanguageCs').should('contain.text', 'Čeština');
        cy.get('#portalLanguageDe').should('contain.text', 'Deutsch');
        cy.get('#portalLanguageEn').should('contain.text', 'English (UK)').and('have.class', 'selected');
        cy.get('#portalLanguageUs').should('contain.text', 'English (US)');
        cy.get('#portalLanguageEs').should('contain.text', 'Español');
        cy.get('#portalLanguageFr').should('contain.text', 'Français');
        cy.get('#portalLanguageIt').should('contain.text', 'Italiano');
        cy.get('#portalLanguageRu').should('contain.text', 'Русский');
        cy.get('#portalLanguageRo').should('contain.text', 'Romana');
        cy.get('#portalLanguageTr').should('contain.text', 'Türkçe');
      });

    cy.get("lib-bimplus-user-menu")
      .shadow()
      .find('li[key="clearCache"]')
      .should('exist')
      .find('.icon-clear-cache')
      .should('exist')  // Verify that the icon with the 'icon-clear-cache' class is present
      .and('have.class', 'icon-clear-cache');  // Ensure it has the correct icon class
    cy.get("lib-bimplus-user-menu")
      .shadow()
      .find('li[key="clearCache"]')
      .should('exist')
      .find('.menu-item-text')
      .should('contain.text', 'Clear cache');  // Check that the text content is "Clear cache"

    // Check for separator
    cy.get('lib-bimplus-user-menu')
      .shadow()
      .find('li[key="dividerLoggedIn"]')
      .should('exist')
      .and('have.attr', 'role', 'separator')
      .and('have.class', 'divider')
      .and('have.class', 'submenu-hidden')

    cy.get("lib-bimplus-user-menu")
      .shadow()
      .find('li[key="logout"]')
      .should('exist')
      .find('.icon-log-out')
      .should('exist')  // Verify that the icon with the 'icon-log-out' class is present
    cy.get("lib-bimplus-user-menu")
      .shadow()
      .find('li[key="logout"]')
      .should('exist')
      .find('.menu-item-text')
      .should('contain.text', 'Logout');  // Check that the text content is "Logout"

    // Close the dropdown menu
    cy.get("lib-bimplus-user-menu")
      .click()

    // Drop down is closed
    cy.get("lib-bimplus-user-menu")
      .shadow()
      .find('.bimcomp-dropdown-menu')
      .should('not.have.class', 'open');
  })

})