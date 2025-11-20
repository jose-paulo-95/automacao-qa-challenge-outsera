import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../page_objects/LoginPage';

Given('que estou na página de login', () => {
  LoginPage.visit();
});

When('eu preencho o username {string}', (username) => {
  LoginPage.fillUsername(username);
});

When('eu preencho a senha {string}', (password) => {
  LoginPage.fillPassword(password);
});

When('eu clico no botão de login', () => {
  LoginPage.clickLogin();
});

Then('eu devo ver a mensagem de sucesso', () => {
  LoginPage.shouldShowSuccessMessage();
});

Then('eu devo ver a mensagem de erro', () => {
  LoginPage.shouldShowErrorMessage();
});

Then('eu devo estar logado na aplicação', () => {
  cy.url().should('not.include', '/login');
  LoginPage.shouldShowSuccessMessage();
});

Then('eu não devo estar logado na aplicação', () => {
  cy.url().should('include', '/login');
  LoginPage.shouldShowErrorMessage();
});

