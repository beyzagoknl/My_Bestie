export class SignUpPage {
  submitForm(
    firstName,
    surname,
    email,
    confirmedEmail,
    password,
    confirmedPassword,
    image
  ) {
    cy.get(".register-page").then((input) => {
      cy.wrap(input).find('[placeholder="First Name"]').type(firstName);
      cy.wrap(input).find('[placeholder="Surname"]').type(surname);
      cy.wrap(input).find('[placeholder="Email address"]').type(email);
      cy.wrap(input)
        .find('[placeholder="Confirm Email address"]')
        .type(confirmedEmail);
      cy.wrap(input).find('[placeholder="Password"]').type(password);
      cy.wrap(input)
        .find('[placeholder="Repeat your password"]')
        .type(confirmedPassword);
      cy.wrap(input).find('[type="file"]').selectFile(image, { force: true });
      cy.wrap(input).find(".btn-submit").click();
    });
  }
}

export const onSignUpPage = new SignUpPage();
