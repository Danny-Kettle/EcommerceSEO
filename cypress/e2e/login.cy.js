describe("Login", () => {
  it("Logs in successfully with admin credentials", () => {
    cy.loginAdmin();
  });

  it("Logs in successfully with user credentials", () => {
    cy.loginUser();
  });

  it("Displays an error with incorrect credentials", () => {
    cy.visit("localhost:3000/login");
    cy.get("#email").type("example@example.com");
    cy.get("#password").type("wrongpassword");
    cy.get("#loginButton").click();
    cy.contains("Invalid email or password, please try again.");
  });
});
