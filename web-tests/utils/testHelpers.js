/**
 * Helpers para ações comuns nos testes
 * Centraliza lógica reutilizável e evita duplicação
 */
import LoginPage from '../page_objects/LoginPage';
import ProductPage from '../page_objects/ProductPage';
import NavigationPage from '../page_objects/NavigationPage';
import CartPage from '../page_objects/CartPage';

/**
 * Realiza login na aplicação
 * @param {string} username - Nome de usuário
 * @param {string} password - Senha
 */
export function login(username, password) {
  LoginPage.visit();
  LoginPage.login(username, password);
}

/**
 * Realiza login usando dados de fixture
 * @param {string} userType - Tipo de usuário (ex: 'validUser')
 */
export function loginWithFixture(userType = 'validUser') {
  cy.fixture('users').then((users) => {
    const user = users[userType];
    login(user.username, user.password);
  });
}

/**
 * Adiciona produto ao carrinho
 * @param {number} index - Índice do produto (0 = primeiro)
 */
export function addProductToCart(index = 0) {
  ProductPage.addProductToCartByIndex(index);
}

/**
 * Navega até o carrinho
 */
export function navigateToCart() {
  NavigationPage.clickCartLink();
  CartPage.shouldBeLoaded();
}

/**
 * Navega até o checkout
 * Requer que o usuário esteja logado e tenha itens no carrinho
 */
export function navigateToCheckout() {
  navigateToCart();
  cy.get('#checkout').click();
}

/**
 * Prepara o ambiente para checkout (login + adicionar produto + ir para checkout)
 * @param {string} userType - Tipo de usuário para login
 */
export function setupCheckoutFlow(userType = 'validUser') {
  loginWithFixture(userType);
  addProductToCart();
  navigateToCart();
  cy.get('#checkout').click();
}

