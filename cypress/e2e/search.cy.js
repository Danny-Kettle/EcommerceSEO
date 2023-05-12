describe("Shop page", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/shop");
  });

  it("should display all products by default", () => {
    cy.get("[data-cy=product]").should("have.length", 9);
  });

  it("should filter products by category", () => {
    cy.get("[data-cy=filter]").click();
    cy.get("[data-cy=filter-category]").select("audio");
    cy.get("[data-cy=product]").should("have.length", 3);
  });

  it("should filter products by brand", () => {
    cy.get("[data-cy=filter]").click();
    cy.get("[data-cy=filter-brand]").select("apple");
    cy.get("[data-cy=product]").should("have.length", 3);
  });

  it("should search for products by name", () => {
    cy.get("[data-cy=search-input]").type("a");
    cy.get("[data-cy=product]").should("have.length", 6);
  });
});
