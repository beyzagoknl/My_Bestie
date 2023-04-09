Cypress.Commands.add("openRegisterPage", () => {
  cy.visit("/");
  cy.contains("Sign up").click();
});

Cypress.Commands.add("openLoginPage", () => {
  cy.visit("/login");
  cy.contains("Login").click();
});
