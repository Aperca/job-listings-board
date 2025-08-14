export {}; // Ensures this file is treated as a module by TypeScript

// cypress/support/commands.ts
declare global {
    namespace Cypress {
      interface Chainable {
        login(email: string, password: string): Chainable<void>;
      }
    }
  }
  
  Cypress.Commands.add('login', (email: string, password: string) => {
    cy.visit('/login');
    cy.get('input[id="email"]').type(email); // Update selector if needed
    cy.get('input[id="password"]').type(password); // Update selector if needed
    cy.get('button[type="submit"]').click(); // Update selector if needed
  });