export class loginPage {
  submitForm(email, password) {
    cy.get(".login-page").then((input) => {
      cy.wrap(input).find('[placeholder="Email address"]').type(email);
      cy.wrap(input).find('[placeholder="Password"]').type(password);
      cy.wrap(input).find(".btn-submit").click();
    });
  }
}

export const onLoginPage = new loginPage();
