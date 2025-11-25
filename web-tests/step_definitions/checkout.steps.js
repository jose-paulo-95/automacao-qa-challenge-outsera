import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CheckoutPage from "../page_objects/CheckoutPage";
import { setupCheckoutFlow } from "../utils/testHelpers";
import { MESSAGES } from "../constants/messages";

Given("que estou na página de checkout", () => {
  setupCheckoutFlow();
  CheckoutPage.visit();
});

Given("que tenho itens no carrinho", () => {
  setupCheckoutFlow();
});

When("eu preencho o primeiro nome {string}", (firstName) => {
  CheckoutPage.fillFirstName(firstName);
});

When("eu preencho o último nome {string}", (lastName) => {
  CheckoutPage.fillLastName(lastName);
});

When("eu preencho o código postal {string}", (postalCode) => {
  CheckoutPage.fillPostalCode(postalCode);
});

When("eu clico no botão continuar", () => {
  CheckoutPage.clickContinue();
});

When("eu clico no botão finalizar", () => {
  CheckoutPage.clickFinish();
});

When("eu visualizo o carrinho", () => {
  cy.url().should("include", "/cart.html");
});

Then("eu devo ver a mensagem de sucesso do checkout", () => {
  CheckoutPage.shouldShowSuccessMessage();
});

Then("eu devo ver {string}", (text) => {
  cy.shouldContainText("body", text);
});

Then("eu devo ver a mensagem de erro do checkout", () => {
  CheckoutPage.shouldShowErrorMessage();
});

Then("eu devo ver a mensagem de erro do checkout com texto {string}", (message) => {
  CheckoutPage.shouldShowErrorMessage(message);
});

Then("eu devo ver os itens no carrinho", () => {
  cy.get(".cart_item", { timeout: 10000 })
    .should("have.length.greaterThan", 0)
    .should("be.visible");
});

Then("eu devo ver o preço total", () => {
  CheckoutPage.shouldShowTotalPrice();
});
