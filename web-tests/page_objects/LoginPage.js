/**
 * Page Object para a página de Login
 */
class LoginPage {
  constructor() {
    this.url = '/login';
    this.usernameInput = '#username';
    this.passwordInput = '#password';
    this.loginButton = 'button[type="submit"]';
    this.successMessage = '.flash.success';
    this.errorMessage = '.flash.error';
  }

  visit() {
    cy.visit(this.url);
  }

  fillUsername(username) {
    cy.fillField(this.usernameInput, username);
    return this;
  }

  fillPassword(password) {
    cy.fillField(this.passwordInput, password);
    return this;
  }

  clickLogin() {
    cy.clickElement(this.loginButton);
    return this;
  }

  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.clickLogin();
    return this;
  }

  shouldShowSuccessMessage() {
    cy.get(this.successMessage).should('be.visible');
    return this;
  }

  shouldShowErrorMessage() {
    cy.get(this.errorMessage).should('be.visible');
    return this;
  }

  shouldContainText(text) {
    cy.shouldContainText('body', text);
    return this;
  }
}

export default new LoginPage();

