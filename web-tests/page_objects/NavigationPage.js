/**
 * Page Object para navegação geral
 */
class NavigationPage {
  constructor() {
    this.homeLink = 'a[href="/"]';
    this.loginLink = 'a[href="/login"]';
    this.checkoutLink = 'a[href="/checkout"]';
  }

  visitHome() {
    cy.visit('/');
  }

  clickHomeLink() {
    cy.clickElement(this.homeLink);
    return this;
  }

  clickLoginLink() {
    cy.clickElement(this.loginLink);
    return this;
  }

  clickCheckoutLink() {
    cy.clickElement(this.checkoutLink);
    return this;
  }

  shouldBeOnPage(url) {
    cy.url().should('include', url);
    return this;
  }
}

export default new NavigationPage();

