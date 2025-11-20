/**
 * Page Object para navegação geral
 */
class NavigationPage {
  constructor() {
    // Seletores do SauceDemo
    this.menuButton = '#react-burger-menu-btn';
    this.inventoryLink = '#inventory_sidebar_link';
    this.aboutLink = '#about_sidebar_link';
    this.logoutLink = '#logout_sidebar_link';
    this.resetLink = '#reset_sidebar_link';
    this.cartLink = '.shopping_cart_link';
  }

  visitHome() {
    // Interceptar apenas requisições de API, não a página HTML
    cy.intercept('GET', '**/*.json', { failOnStatusCode: false }).as('apiRequests');
    cy.intercept('POST', '**/*', { failOnStatusCode: false }).as('postRequests');
    cy.visit('/');
  }

  clickHomeLink() {
    // No SauceDemo, após login, a página inicial é /inventory.html
    cy.intercept('GET', '**/*.json', { failOnStatusCode: false }).as('apiRequests');
    cy.visit('/inventory.html');
    return this;
  }

  clickLoginLink() {
    // No SauceDemo, para voltar ao login, fazer logout primeiro
    this.clickMenuButton();
    cy.get(this.logoutLink).click();
    return this;
  }

  clickMenuButton() {
    cy.clickElement(this.menuButton);
    return this;
  }

  clickCartLink() {
    cy.clickElement(this.cartLink);
    return this;
  }

  shouldBeOnPage(url) {
    cy.url().should('include', url);
    return this;
  }
}

export default new NavigationPage();

