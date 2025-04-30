import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts'
  },

  env: {
    baseUrl: 'http://localhost:4200',
    appTitle: "Bimplus Component Angular Example",
    // Credentials from ENV variable
    userEmail: "",
    userRealName: "Demo user",
    // userImageLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMS36RRWYaTysG471mlormL1bYN3-QIabbo30rDitKRoaDs3EA&amp;s",
    userImageLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMS36RRWYaTysG471mlormL1bYN3-QIabbo30rDitKRoaDs3EA&s",
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  },
})
