/**
 * Page Object para a página de Checkout
 */
import { SELECTORS } from '../constants/selectors';
import { URLS } from '../constants/urls';
import { TIMEOUTS } from '../constants/timeouts';
import { MESSAGES } from '../constants/messages';

class CheckoutPage {
  constructor() {
    this.url = URLS.CHECKOUT_STEP_ONE;
    this.selectors = SELECTORS.CHECKOUT;
    this.messages = MESSAGES.CHECKOUT;
  }

  visit() {
    cy.url().should('include', URLS.CHECKOUT_STEP_ONE);
    return this;
  }

  fillFirstName(firstName) {
    cy.fillField(this.selectors.FIRST_NAME_INPUT, firstName);
    return this;
  }

  fillLastName(lastName) {
    cy.fillField(this.selectors.LAST_NAME_INPUT, lastName);
    return this;
  }

  fillPostalCode(postalCode) {
    cy.fillField(this.selectors.POSTAL_CODE_INPUT, postalCode);
    return this;
  }

  fillCheckoutForm(firstName, lastName, postalCode) {
    this.fillFirstName(firstName);
    this.fillLastName(lastName);
    this.fillPostalCode(postalCode);
    return this;
  }

  clickContinue() {
    cy.clickElement(this.selectors.CONTINUE_BUTTON);
    return this;
  }

  clickCancel() {
    cy.clickElement(this.selectors.CANCEL_BUTTON);
    return this;
  }

  clickFinish() {
    cy.clickElement(this.selectors.FINISH_BUTTON);
    return this;
  }

  completeCheckout(firstName, lastName, postalCode) {
    this.fillCheckoutForm(firstName, lastName, postalCode);
    this.clickContinue();
    this.clickFinish();
    return this;
  }

  shouldShowSuccessMessage() {
    cy.url().should('include', URLS.CHECKOUT_COMPLETE);
    cy.get(this.selectors.SUCCESS_MESSAGE, { timeout: TIMEOUTS.ELEMENT_VISIBILITY })
      .should('be.visible');
    cy.shouldContainText(this.selectors.SUCCESS_MESSAGE, this.messages.SUCCESS);
    return this;
  }

  shouldShowErrorMessage(message) {
    cy.get(this.selectors.ERROR_MESSAGE_CONTAINER, { timeout: TIMEOUTS.ELEMENT_VISIBILITY })
      .should('be.visible');
    cy.get(this.selectors.ERROR_MESSAGE_TEXT)
      .should('be.visible');
    if (message) {
      cy.shouldContainText(this.selectors.ERROR_MESSAGE_TEXT, message);
    }
    return this;
  }

  shouldShowTotalPrice() {
    cy.get(this.selectors.SUMMARY_TOTAL_LABEL, { timeout: TIMEOUTS.ELEMENT_VISIBILITY })
      .should('be.visible');
    cy.get(this.selectors.SUMMARY_SUBTOTAL_LABEL)
      .should('be.visible');
    return this;
  }
}

export default new CheckoutPage();

