/// <reference types="cypress"/>

import { onSignUpPage } from "../support/page_objects/registerPage";

describe("Sign up process", () => {
  beforeEach("open application", () => {
    cy.openRegisterPage();
  });

  it("should be entered same email", () => {
    onSignUpPage.submitForm(
      "Beyza",
      "GOK",
      "beyza@gmail.com",
      "beyza1@gmail.com",
      "Beyza$asd",
      "Beyza$asd",
      "cypress/fixtures/image.jpg"
    );
    cy.get(
      '[class="Toastify__toast-icon Toastify--animate-icon Toastify__zoom-enter"]'
    )
      .next()
      .should("contain", "Email does not match!");
  });
  it("should be entered same password", () => {
    onSignUpPage.submitForm(
      "Beyza",
      "GOK",
      "beyza@gmail.com",
      "beyza@gmail.com",
      "Beyza$asd",
      "Beyza$asd1",
      "cypress/fixtures/image.jpg"
    );
    cy.get(
      '[class="Toastify__toast-icon Toastify--animate-icon Toastify__zoom-enter"]'
    )
      .next()
      .should("contain", "Password does not match!");
  });
  it("should be unexist email", () => {
    onSignUpPage.submitForm(
      "Beyza",
      "GOK",
      "angela@gmail.com",
      "angela@gmail.com",
      "Beyza$asd",
      "Beyza$asd",
      "cypress/fixtures/image.jpg"
    );

    cy.get(".error-alert").should(
      "contain",
      "A user with the email address 'angela@gmail.com' already exists"
    );
  });
  it("should be everything correct", () => {
    const randomEmail = Math.random();
    const email = `beyza${randomEmail}@gmail.com`;
    onSignUpPage.submitForm(
      "Beyza",
      "GOK",
      email,
      email,
      "Beyza$asd23",
      "Beyza$asd23",
      "cypress/fixtures/image.jpg"
    );
    cy.get(".user-name-nav").should("contain", "Hello, Beyza");
  });
});
