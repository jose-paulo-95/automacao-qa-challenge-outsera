/**
 * Page Object para a página de Login
 */
import { SELECTORS } from '../constants/selectors';
import { URLS } from '../constants/urls';
import { TIMEOUTS } from '../constants/timeouts';
import { setupNetworkInterceptions } from '../utils/networkUtils';

class LoginPage {
  constructor() {
    this.url = URLS.LOGIN;
    this.selectors = SELECTORS.LOGIN;
  }

  visit() {
    setupNetworkInterceptions();
    cy.visit(this.url);
    return this;
  }

  fillUsername(username) {
    cy.fillField(this.selectors.USERNAME_INPUT, username);
    return this;
  }

  fillPassword(password) {
    cy.fillField(this.selectors.PASSWORD_INPUT, password);
    return this;
  }

  clickLogin() {
    cy.clickElement(this.selectors.LOGIN_BUTTON);
    return this;
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickLogin();
    return this;
  }

  shouldShowSuccessMessage() {
    cy.url().should('include', URLS.INVENTORY);
    cy.get(SELECTORS.PRODUCTS.INVENTORY_CONTAINER, { timeout: TIMEOUTS.ELEMENT_VISIBILITY })
      .should('be.visible');
    return this;
  }

  shouldShowErrorMessage() {
    cy.get(this.selectors.ERROR_MESSAGE_CONTAINER, { timeout: TIMEOUTS.ELEMENT_VISIBILITY })
      .should('be.visible');
    cy.get(this.selectors.ERROR_MESSAGE_TEXT)
      .should('be.visible');
    return this;
  }

  shouldShowErrorMessageWithText(message) {
    this.shouldShowErrorMessage();
    if (message) {
      cy.get(this.selectors.ERROR_MESSAGE_TEXT).should('contain', message);
    }
    return this;
  }

  shouldContainText(text) {
    cy.shouldContainText('body', text);
    return this;
  }
}

export default new LoginPage();

