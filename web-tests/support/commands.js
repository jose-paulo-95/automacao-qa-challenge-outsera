// ***********************************************
// Este arquivo contém comandos customizados do Cypress
// ***********************************************

/**
 * Comando para aguardar elemento estar visível e clicável
 * @param {string} selector - Seletor do elemento
 * @param {number} timeout - Timeout em ms (opcional)
 */
Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible');
});

/**
 * Comando para preencher campo de formulário
 * @param {string} selector - Seletor do campo
 * @param {string} value - Valor a ser preenchido
 */
Cypress.Commands.add('fillField', (selector, value) => {
  cy.get(selector).clear();
  // Se o valor não for vazio, digita o texto
  // Se for vazio, apenas limpa o campo (para testar validação de campos obrigatórios)
  if (value && value.trim() !== '') {
    cy.get(selector).type(value);
  }
});

/**
 * Comando para clicar em elemento com retry
 * @param {string} selector - Seletor do elemento
 */
Cypress.Commands.add('clickElement', (selector) => {
  cy.get(selector).should('be.visible').click();
});

/**
 * Comando para validar texto em elemento
 * @param {string} selector - Seletor do elemento
 * @param {string} expectedText - Texto esperado
 */
Cypress.Commands.add('shouldContainText', (selector, expectedText) => {
  cy.get(selector).should('contain', expectedText);
});

/**
 * Comando para fazer upload de arquivo
 * @param {string} selector - Seletor do input file
 * @param {string} filePath - Caminho do arquivo
 */
Cypress.Commands.add('uploadFile', (selector, filePath) => {
  cy.get(selector).selectFile(filePath);
});

/**
 * Comando para visitar página ignorando erros de rede
 * @param {string} url - URL para visitar
 * @param {object} options - Opções adicionais
 */
Cypress.Commands.add('visitIgnoringNetworkErrors', (url, options = {}) => {
  // Interceptar requisições que podem falhar
  cy.intercept('**/*', { failOnStatusCode: false }).as('networkRequests');
  
  // Visitar a página
  cy.visit(url, {
    failOnStatusCode: false,
    ...options
  });
  
  // Aguardar um pouco para garantir que a página carregou
  cy.wait(1000);
});

