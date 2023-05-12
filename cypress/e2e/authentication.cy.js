describe("Authentication", () => {
  it("should sign in and sign out user successfully", () => {
    // Visit the page
    cy.visit("localhost:3000/");

    // Ensure the sign in button is displayed
    cy.get("#signIn").should("be.visible");

    // Click the sign in button
    cy.get("#signIn").click();

    cy.wait(4000); // wait for the page to reload


    cy.get("#email").type("admin@admin.com");
    cy.get("#password").type("root");
    cy.get("#loginButton").click();

    cy.wait(4000); // wait for the page to reload

    // Ensure that the user is redirected to the home page and sign out button is displayed
    cy.url().should("include", "localhost:3000/");

    cy.get("#signOut").should("be.visible");

    // Click the sign out button
    cy.get("#signOut").click();
    
    cy.get("#signIn").should("be.visible");
  });
});
