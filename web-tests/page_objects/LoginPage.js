/**
 * Page Object para a página de Login
 */
class LoginPage {
  constructor() {
    this.url = '/';
    // Seletores do SauceDemo
    this.usernameInput = '#user-name';
    this.passwordInput = '#password';
    this.loginButton = '#login-button';
    // Após login bem-sucedido, redireciona para /inventory.html
    this.successMessage = '.inventory_container';
    this.errorMessage = '.error-message-container';
    this.errorMessageText = 'h3[data-test="error"]';
  }

  visit() {
    // Interceptar apenas requisições de API (JSON, XML), não a página HTML principal
    cy.intercept('GET', '**/*.json', { failOnStatusCode: false }).as('apiRequests');
    cy.intercept('POST', '**/*', { failOnStatusCode: false }).as('postRequests');
    cy.intercept('PUT', '**/*', { failOnStatusCode: false }).as('putRequests');
    cy.intercept('DELETE', '**/*', { failOnStatusCode: false }).as('deleteRequests');
    
    // Visitar a página normalmente (sem interceptar HTML)
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
    // No SauceDemo, login bem-sucedido redireciona para a página de produtos
    cy.url().should('include', '/inventory.html');
    cy.get(this.successMessage).should('be.visible');
    return this;
  }

  shouldShowErrorMessage() {
    // No SauceDemo, mensagem de erro aparece no container
    cy.get(this.errorMessage).should('be.visible');
    cy.get(this.errorMessageText).should('be.visible');
    return this;
  }

  shouldContainText(text) {
    cy.shouldContainText('body', text);
    return this;
  }
}

export default new LoginPage();

