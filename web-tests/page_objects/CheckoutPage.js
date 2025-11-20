/**
 * Page Object para a página de Checkout
 */
class CheckoutPage {
  constructor() {
    // Seletores do SauceDemo
    this.url = '/checkout-step-one.html';
    this.firstNameInput = '#first-name';
    this.lastNameInput = '#last-name';
    this.postalCodeInput = '#postal-code';
    this.continueButton = '#continue';
    this.finishButton = '#finish';
    this.successMessage = '.complete-header';
    this.successMessageText = '.complete-text';
    this.errorMessage = '.error-message-container';
    this.errorMessageText = 'h3[data-test="error"]';
    this.cartItems = '.cart_item';
    this.totalPrice = '.summary_total_label';
  }

  visit() {
    // Este método não é mais usado diretamente
    // O fluxo de checkout é iniciado pelos step definitions
    // que fazem login, adicionam produtos e navegam até o checkout
    cy.url().should('include', '/checkout-step-one.html');
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
    // No SauceDemo, após finalizar checkout, mostra página de sucesso
    cy.url().should('include', '/checkout-complete.html');
    cy.get(this.successMessage).should('be.visible');
    cy.shouldContainText(this.successMessage, 'Thank you for your order!');
    return this;
  }

  shouldShowErrorMessage(message) {
    // No SauceDemo, mensagem de erro aparece no container
    cy.get(this.errorMessage).should('be.visible');
    cy.get(this.errorMessageText).should('be.visible');
    if (message) {
      cy.shouldContainText(this.errorMessageText, message);
    }
    return this;
  }

  shouldHaveItemsInCart(count) {
    cy.get(this.cartItems).should('have.length', count);
    return this;
  }
}

export default new CheckoutPage();

