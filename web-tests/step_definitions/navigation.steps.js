import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import NavigationPage from '../page_objects/NavigationPage';
import ProductPage from '../page_objects/ProductPage';
import { loginWithFixture } from '../utils/testHelpers';

Given('que estou na página inicial', () => {
  loginWithFixture();
  NavigationPage.shouldBeOnInventoryPage();
});

When('eu clico no link do carrinho', () => {
  NavigationPage.clickCartLink();
});

Then('eu devo estar na página inicial', () => {
  NavigationPage.shouldBeOnInventoryPage();
});

Then('eu devo estar na página do carrinho', () => {
  NavigationPage.shouldBeOnCartPage();
});

Then('eu devo ver os elementos principais da página', () => {
  ProductPage.shouldBeLoaded();
});
