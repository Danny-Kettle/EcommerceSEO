describe("Signup", () => {
  it("Registers a new user successfully", () => {
    cy.visit("localhost:3000/login");
    cy.get("#createAcc").click();
    cy.get("#email").type("testuser@example.coamuk");
    cy.get("#password").type("testpassword");
    cy.get("#loginButton").click();
    cy.wait(2000); // wait for the page to reload
    cy.contains("You have successfully registered!");
  });

  it("Displays an error when signing up with an existing email", () => {
    cy.visit("localhost:3000/login");
    cy.get("#createAcc").click();
    cy.get("#email").type("admin@admin.com");
    cy.get("#password").type("root");
    cy.get("#loginButton").click();
    cy.wait(2000); // wait for the page to reload
    cy.contains("User already exists");
  });
});
