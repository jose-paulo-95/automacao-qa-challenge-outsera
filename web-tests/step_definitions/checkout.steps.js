import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CheckoutPage from "../page_objects/CheckoutPage";

Given("que estou na página de checkout", () => {
  // Interceptar apenas requisições de API, não a página HTML
  cy.intercept("GET", "**/*.json", { failOnStatusCode: false }).as(
    "apiRequests"
  );
  cy.intercept("POST", "**/*", { failOnStatusCode: false }).as("postRequests");

  // No SauceDemo, precisa fazer login e adicionar produtos ao carrinho primeiro
  cy.visit("/");

  // Login
  cy.get("#user-name").type("standard_user");
  cy.get("#password").type("secret_sauce");
  cy.get("#login-button").click();
  cy.wait(1000); // Aguardar carregamento após login

  // Adicionar produto ao carrinho
  cy.get(".btn_inventory").first().click();
  cy.wait(500);

  // Ir para o carrinho
  cy.get(".shopping_cart_link").click();
  cy.wait(1000);

  // Ir para checkout
  cy.get("#checkout").click();
  cy.wait(1000);
});

Given("que tenho itens no carrinho", () => {
  // Interceptar apenas requisições de API, não a página HTML
  cy.intercept("GET", "**/*.json", { failOnStatusCode: false }).as(
    "apiRequests"
  );
  cy.intercept("POST", "**/*", { failOnStatusCode: false }).as("postRequests");

  // Fazer login e adicionar produtos ao carrinho
  cy.visit("/");

  cy.get("#user-name").type("standard_user");
  cy.get("#password").type("secret_sauce");
  cy.get("#login-button").click();
  cy.wait(1000);

  // Adicionar produto ao carrinho
  cy.get(".btn_inventory").first().click();
  cy.wait(500);

  // Ir para o carrinho
  cy.get(".shopping_cart_link").click();
  cy.wait(1000);
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
  // Já deve estar no carrinho pelo step anterior
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

Then("eu devo ver os itens no carrinho", () => {
  // Validar que existem itens no carrinho no SauceDemo
  cy.get(".cart_item").should("have.length.greaterThan", 0);
  cy.get(".cart_item").should("be.visible");
});

Then("eu devo ver o preço total", () => {
  // Validar que o preço total está visível no SauceDemo
  cy.get(".summary_total_label").should("be.visible");
  cy.get(".summary_subtotal_label").should("be.visible");
});
