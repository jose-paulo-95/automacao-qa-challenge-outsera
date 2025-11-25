/**
 * Page Object para a página de Produtos/Inventário
 */
import { SELECTORS } from '../constants/selectors';
import { URLS } from '../constants/urls';
import { TIMEOUTS } from '../constants/timeouts';

class ProductPage {
  constructor() {
    this.url = URLS.INVENTORY;
    this.selectors = SELECTORS.PRODUCTS;
  }

  visit() {
    cy.visit(this.url);
    this.waitForPageLoad();
    return this;
  }

  waitForPageLoad() {
    cy.get(this.selectors.INVENTORY_CONTAINER, { timeout: TIMEOUTS.ELEMENT_VISIBILITY })
      .should('be.visible');
    return this;
  }

  /**
   * Adiciona produto ao carrinho pelo índice
   * @param {number} index - Índice do produto (0 = primeiro)
   */
  addProductToCartByIndex(index = 0) {
    cy.get(this.selectors.ADD_TO_CART_BUTTON)
      .eq(index)
      .should('be.visible')
      .click();
    return this;
  }

  /**
   * Adiciona produto ao carrinho pelo nome
   * @param {string} productName - Nome do produto
   */
  addProductToCartByName(productName) {
    cy.get(this.selectors.INVENTORY_ITEM)
      .contains(productName)
      .parent()
      .find(this.selectors.ADD_TO_CART_BUTTON)
      .click();
    return this;
  }

  /**
   * Remove produto do carrinho pelo índice
   * @param {number} index - Índice do produto
   */
  removeProductFromCartByIndex(index = 0) {
    cy.get(this.selectors.REMOVE_FROM_CART_BUTTON)
      .eq(index)
      .should('be.visible')
      .click();
    return this;
  }

  /**
   * Obtém o nome do produto pelo índice
   * @param {number} index - Índice do produto
   * @returns {Cypress.Chainable<string>}
   */
  getProductName(index = 0) {
    return cy.get(this.selectors.ITEM_NAME).eq(index);
  }

  /**
   * Obtém o preço do produto pelo índice
   * @param {number} index - Índice do produto
   * @returns {Cypress.Chainable<string>}
   */
  getProductPrice(index = 0) {
    return cy.get(this.selectors.ITEM_PRICE).eq(index);
  }

  /**
   * Verifica se a página de produtos está carregada
   */
  shouldBeLoaded() {
    cy.url().should('include', URLS.INVENTORY);
    cy.get(this.selectors.INVENTORY_CONTAINER).should('be.visible');
    cy.get(this.selectors.INVENTORY_ITEM).should('have.length.greaterThan', 0);
    return this;
  }

  /**
   * Verifica se existem produtos na página
   * @param {number} minCount - Número mínimo de produtos esperados
   */
  shouldHaveProducts(minCount = 1) {
    cy.get(this.selectors.INVENTORY_ITEM).should('have.length.greaterThan', minCount - 1);
    return this;
  }
}

export default new ProductPage();

