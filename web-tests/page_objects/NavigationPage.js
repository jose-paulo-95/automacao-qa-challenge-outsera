/**
 * Page Object para navegação geral
 */
import { SELECTORS } from '../constants/selectors';
import { URLS } from '../constants/urls';
import { setupNetworkInterceptions } from '../utils/networkUtils';

class NavigationPage {
  constructor() {
    this.selectors = SELECTORS.NAVIGATION;
  }

  visitHome() {
    setupNetworkInterceptions();
    cy.visit(URLS.BASE);
    return this;
  }

  clickHomeLink() {
    setupNetworkInterceptions();
    cy.visit(URLS.INVENTORY);
    return this;
  }

  clickLoginLink() {
    this.clickMenuButton();
    cy.get(this.selectors.LOGOUT_LINK).click();
    return this;
  }

  clickMenuButton() {
    cy.clickElement(this.selectors.MENU_BUTTON);
    return this;
  }

  clickCartLink() {
    cy.clickElement(this.selectors.CART_LINK);
    return this;
  }

  clickLogout() {
    this.clickMenuButton();
    cy.get(this.selectors.LOGOUT_LINK).click();
    return this;
  }

  shouldBeOnPage(url) {
    cy.url().should('include', url);
    return this;
  }

  shouldBeOnInventoryPage() {
    this.shouldBeOnPage(URLS.INVENTORY);
    return this;
  }

  shouldBeOnCartPage() {
    this.shouldBeOnPage(URLS.CART);
    return this;
  }
}

export default new NavigationPage();

