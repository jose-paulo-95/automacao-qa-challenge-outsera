/**
 * Seletores centralizados da aplicação
 * Facilita manutenção e evita duplicação de código
 */
export const SELECTORS = {
  // Login
  LOGIN: {
    USERNAME_INPUT: '#user-name',
    PASSWORD_INPUT: '#password',
    LOGIN_BUTTON: '#login-button',
    ERROR_MESSAGE_CONTAINER: '.error-message-container',
    ERROR_MESSAGE_TEXT: 'h3[data-test="error"]'
  },

  // Navigation
  NAVIGATION: {
    MENU_BUTTON: '#react-burger-menu-btn',
    INVENTORY_LINK: '#inventory_sidebar_link',
    ABOUT_LINK: '#about_sidebar_link',
    LOGOUT_LINK: '#logout_sidebar_link',
    RESET_LINK: '#reset_sidebar_link',
    CART_LINK: '.shopping_cart_link'
  },

  // Products/Inventory
  PRODUCTS: {
    INVENTORY_CONTAINER: '.inventory_container',
    INVENTORY_ITEM: '.inventory_item',
    ITEM_NAME: '.inventory_item_name',
    ITEM_PRICE: '.inventory_item_price',
    ADD_TO_CART_BUTTON: '.btn_inventory',
    REMOVE_FROM_CART_BUTTON: '.btn_secondary'
  },

  // Cart
  CART: {
    CART_ITEM: '.cart_item',
    CART_QUANTITY: '.cart_quantity',
    CHECKOUT_BUTTON: '#checkout',
    CONTINUE_SHOPPING_BUTTON: '.btn_secondary'
  },

  // Checkout
  CHECKOUT: {
    FIRST_NAME_INPUT: '#first-name',
    LAST_NAME_INPUT: '#last-name',
    POSTAL_CODE_INPUT: '#postal-code',
    CONTINUE_BUTTON: '#continue',
    CANCEL_BUTTON: '#cancel',
    FINISH_BUTTON: '#finish',
    SUCCESS_MESSAGE: '.complete-header',
    SUCCESS_MESSAGE_TEXT: '.complete-text',
    ERROR_MESSAGE_CONTAINER: '.error-message-container',
    ERROR_MESSAGE_TEXT: 'h3[data-test="error"]',
    SUMMARY_TOTAL_LABEL: '.summary_total_label',
    SUMMARY_SUBTOTAL_LABEL: '.summary_subtotal_label'
  }
};

