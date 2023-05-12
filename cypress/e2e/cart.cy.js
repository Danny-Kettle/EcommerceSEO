describe("Cart page", () => {
  beforeEach(() => {
    // Visit the cart page before each test
    cy.loginUser();
    cy.visit("localhost:3000/");
  });

  it("displays an empty cart message when there are no items", () => {
    cy.visit("localhost:3000/cart");
    cy.contains("Your cart is currently empty.");
  });

  it("displays cart items when there are items in the cart", () => {
    // Add a cart item to test with
    cy.addToCart();
    cy.wait(2000); // wait for the page to reload

    cy.visit("localhost:3000/cart");
    // Ensure that the cart item is displayed
    cy.contains("Checkout");
  });

  it("displays an error message when there is insufficient stock", () => {
    // Add a cart item to test with
    cy.addToCart();
    cy.wait(2000); // wait for the page to reload
    cy.addToCart();
    cy.wait(2000); // wait for the page to reload

    cy.visit("localhost:3000/cart");
    cy.wait(2000); // wait for the page to reload
    cy.get("#checkoutBtn").click();

    // Ensure that the error message is displayed
    cy.contains("Not enough stock, try again after cart.");
  });

  it("navigates to the checkout page when the checkout button is clicked", () => {});
});
