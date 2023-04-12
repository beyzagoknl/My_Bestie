/// <reference types="cypress"/>

import { onLoginPage } from "../support/page_objects/loginPage";

describe("Login process", () => {
  beforeEach("open application", () => {
    cy.openLoginPage();
  });

  it("should be entered verify  email and password", () => {
    onLoginPage.submitForm("angela@gmail.com", "Angela!123");
    cy.get(".user-name-nav").should("contain", "Hello, Angela");
  });
});
