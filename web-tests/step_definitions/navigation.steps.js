import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import NavigationPage from '../page_objects/NavigationPage';

Given('que estou na página inicial', () => {
  NavigationPage.visitHome();
});

Given('que estou na página de login', () => {
  cy.visit('/login');
});

When('eu clico no link de home', () => {
  NavigationPage.clickHomeLink();
});

When('eu clico no link de login', () => {
  NavigationPage.clickLoginLink();
});

Then('eu devo estar na página inicial', () => {
  NavigationPage.shouldBeOnPage('/');
});

Then('eu devo estar na página de login', () => {
  NavigationPage.shouldBeOnPage('/login');
});

Then('eu devo ver os elementos principais da página', () => {
  cy.get('body').should('be.visible');
  cy.get('h1, h2').should('exist');
});

