// cypress/support/commands.js

Cypress.Commands.add("addToCart", () => {
  cy.visit("localhost:3000/products/mobiles/643c02c22f85b5a6901a2167");
  cy.get(".add-cart-btn").eq(0).click();
  cy.wait(2000); // wait for the page to reload
  cy.contains("Has been added to the cart");
});

Cypress.Commands.add("loginAdmin", () => {
  cy.visit("localhost:3000/login");
  cy.get("#email").type("admin@admin.com");
  cy.get("#password").type("root");
  cy.get("#loginButton").click();
  cy.wait(2000); // wait for the page to reload
  cy.url().should("include", "/");
});

Cypress.Commands.add("loginUser", () => {
  cy.visit("localhost:3000/login");
  cy.get("#email").type("test@test.com");
  cy.get("#password").type("test78");
  cy.get("#loginButton").click();
  cy.wait(2000); // wait for the page to reload
  cy.url().should("include", "/");
});
