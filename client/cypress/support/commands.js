Cypress.Commands.add("openRegisterPage", () => {
  cy.visit("/");
  cy.contains("Sign up").click();
});
