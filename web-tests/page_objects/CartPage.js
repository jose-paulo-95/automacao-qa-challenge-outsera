/**
 * Page Object para a página do Carrinho
 */
import { SELECTORS } from '../constants/selectors';
import { URLS } from '../constants/urls';
import { TIMEOUTS } from '../constants/timeouts';

class CartPage {
  constructor() {
    this.url = URLS.CART;
    this.selectors = SELECTORS.CART;
  }

  visit() {
    cy.visit(this.url);
    this.waitForPageLoad();
    return this;
  }

  waitForPageLoad() {
    cy.url().should('include', URLS.CART);
    return this;
  }

  /**
   * Clica no botão de checkout
   */
  clickCheckout() {
    cy.get(this.selectors.CHECKOUT_BUTTON)
      .should('be.visible')
      .click();
    return this;
  }

  /**
   * Clica no botão de continuar comprando
   */
  clickContinueShopping() {
    cy.get(this.selectors.CONTINUE_SHOPPING_BUTTON)
      .should('be.visible')
      .click();
    return this;
  }

  /**
   * Verifica se existem itens no carrinho
   * @param {number} count - Número esperado de itens
   */
  shouldHaveItems(count) {
    if (count > 0) {
      cy.get(this.selectors.CART_ITEM, { timeout: TIMEOUTS.ELEMENT_VISIBILITY })
        .should('have.length', count);
    } else {
      cy.get(this.selectors.CART_ITEM).should('not.exist');
    }
    return this;
  }

  /**
   * Verifica se o carrinho está vazio
   */
  shouldBeEmpty() {
    cy.get(this.selectors.CART_ITEM).should('not.exist');
    return this;
  }

  /**
   * Verifica se o carrinho tem pelo menos um item
   */
  shouldHaveAtLeastOneItem() {
    cy.get(this.selectors.CART_ITEM, { timeout: TIMEOUTS.ELEMENT_VISIBILITY })
      .should('have.length.greaterThan', 0)
      .should('be.visible');
    return this;
  }

  /**
   * Obtém o nome do item no carrinho pelo índice
   * @param {number} index - Índice do item
   * @returns {Cypress.Chainable<string>}
   */
  getItemName(index = 0) {
    return cy.get(this.selectors.CART_ITEM).eq(index).find('.inventory_item_name');
  }

  /**
   * Remove item do carrinho pelo índice
   * @param {number} index - Índice do item
   */
  removeItem(index = 0) {
    cy.get(this.selectors.CART_ITEM)
      .eq(index)
      .find('.btn_secondary')
      .click();
    return this;
  }

  /**
   * Verifica se a página do carrinho está carregada
   */
  shouldBeLoaded() {
    cy.url().should('include', URLS.CART);
    return this;
  }
}

export default new CartPage();

