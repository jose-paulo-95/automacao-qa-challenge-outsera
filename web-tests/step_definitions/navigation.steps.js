import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import NavigationPage from '../page_objects/NavigationPage';

Given('que estou na página inicial', () => {
  NavigationPage.visitHome();
});

When('eu clico no link do carrinho', () => {
  NavigationPage.clickCartLink();
});

Then('eu devo estar na página inicial', () => {
  // No SauceDemo, após login, a página inicial é /inventory.html
  NavigationPage.shouldBeOnPage('/inventory.html');
});

Then('eu devo estar na página do carrinho', () => {
  NavigationPage.shouldBeOnPage('/cart.html');
});

Then('eu devo ver os elementos principais da página', () => {
  // No SauceDemo, página de produtos tem container de inventário
  cy.get('.inventory_container').should('be.visible');
  cy.get('.inventory_item').should('have.length.greaterThan', 0);
});

