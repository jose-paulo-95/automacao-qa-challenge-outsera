import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../page_objects/LoginPage";
import { loginWithFixture } from "../utils/testHelpers";
import { MESSAGES } from "../constants/messages";

Given("que estou na página de login", () => {
  LoginPage.visit();
});

When("eu preencho o username {string}", (username) => {
  LoginPage.fillUsername(username);
});

When("eu preencho a senha {string}", (password) => {
  LoginPage.fillPassword(password);
});

When("eu clico no botão de login", () => {
  LoginPage.clickLogin();
});

When("eu faço login com usuário válido", () => {
  loginWithFixture("validUser");
});

When("eu faço login com usuário inválido", () => {
  loginWithFixture("invalidUser");
});

Then("eu devo ver a mensagem de sucesso", () => {
  LoginPage.shouldShowSuccessMessage();
});

Then("eu devo ver a mensagem de erro", () => {
  LoginPage.shouldShowErrorMessage();
});

Then("eu devo ver a mensagem de erro {string}", (message) => {
  LoginPage.shouldShowErrorMessageWithText(message);
});

Then("eu devo estar logado na aplicação", () => {
  cy.url().should("include", "/");
  LoginPage.shouldShowSuccessMessage();
});

Then("eu não devo estar logado na aplicação", () => {
  LoginPage.shouldShowErrorMessage();
});
