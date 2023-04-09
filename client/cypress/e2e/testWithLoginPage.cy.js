/// <reference types="cypress"/>

import { onLoginPage } from "../support/page_objects/loginPage";

describe("Login process", () => {
  beforeEach("open application", () => {
    cy.openLoginPage();
  });

  it("should be entered verify  email", () => {
    onLoginPage.submitForm("angela@gmail.com", "Angela!123", "Angela!123");
    cy.get('[class="home-text"]').should("contain", "Welcome My Friend");
  });
  it("should be verify password", () => {
    onLoginPage.submitForm("angela@gmail.com", "Angela!123");
    cy.get('[class="home-text"]').should("contain", "Welcome My Friend");
  });
});
