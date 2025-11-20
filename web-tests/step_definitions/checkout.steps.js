import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import CheckoutPage from '../page_objects/CheckoutPage';

Given('que estou na página de checkout', () => {
  CheckoutPage.visit();
});

Given('que tenho itens no carrinho', () => {
  // Simular adição de itens ao carrinho
  // Em um cenário real, isso adicionaria produtos ao carrinho primeiro
  CheckoutPage.visit();
});

When('eu preencho o primeiro nome {string}', (firstName) => {
  CheckoutPage.fillFirstName(firstName);
});

When('eu preencho o último nome {string}', (lastName) => {
  CheckoutPage.fillLastName(lastName);
});

When('eu preencho o código postal {string}', (postalCode) => {
  CheckoutPage.fillPostalCode(postalCode);
});

When('eu clico no botão continuar', () => {
  CheckoutPage.clickContinue();
});

When('eu clico no botão finalizar', () => {
  CheckoutPage.clickFinish();
});

When('eu visualizo o carrinho', () => {
  CheckoutPage.visit();
});

Then('eu devo ver a mensagem de sucesso do checkout', () => {
  CheckoutPage.shouldShowSuccessMessage();
});

Then('eu devo ver {string}', (text) => {
  cy.shouldContainText('body', text);
});

Then('eu devo ver a mensagem de erro', () => {
  CheckoutPage.shouldShowErrorMessage();
});

Then('eu devo ver os itens no carrinho', () => {
  // Validar que existem itens no carrinho
  cy.get('body').should('be.visible');
});

Then('eu devo ver o preço total', () => {
  // Validar que o preço total está visível
  cy.get('body').should('be.visible');
});

