/**
 * Page Object para a página de Checkout
 */
class CheckoutPage {
  constructor() {
    this.url = '/checkout';
    this.firstNameInput = '#first-name';
    this.lastNameInput = '#last-name';
    this.postalCodeInput = '#postal-code';
    this.continueButton = '#continue';
    this.finishButton = '#finish';
    this.successMessage = '.complete-header';
    this.errorMessage = '[data-test="error"]';
    this.cartItems = '.cart_item';
    this.totalPrice = '.summary_total_label';
  }

  visit() {
    cy.visit(this.url);
  }

  fillFirstName(firstName) {
    cy.fillField(this.firstNameInput, firstName);
    return this;
  }

  fillLastName(lastName) {
    cy.fillField(this.lastNameInput, lastName);
    return this;
  }

  fillPostalCode(postalCode) {
    cy.fillField(this.postalCodeInput, postalCode);
    return this;
  }

  fillCheckoutForm(firstName, lastName, postalCode) {
    this.fillFirstName(firstName);
    this.fillLastName(lastName);
    this.fillPostalCode(postalCode);
    return this;
  }

  clickContinue() {
    cy.clickElement(this.continueButton);
    return this;
  }

  clickFinish() {
    cy.clickElement(this.finishButton);
    return this;
  }

  completeCheckout(firstName, lastName, postalCode) {
    this.fillCheckoutForm(firstName, lastName, postalCode);
    this.clickContinue();
    this.clickFinish();
    return this;
  }

  shouldShowSuccessMessage() {
    cy.get(this.successMessage).should('be.visible');
    cy.shouldContainText(this.successMessage, 'Thank you for your order!');
    return this;
  }

  shouldShowErrorMessage(message) {
    cy.get(this.errorMessage).should('be.visible');
    if (message) {
      cy.shouldContainText(this.errorMessage, message);
    }
    return this;
  }

  shouldHaveItemsInCart(count) {
    cy.get(this.cartItems).should('have.length', count);
    return this;
  }
}

export default new CheckoutPage();

