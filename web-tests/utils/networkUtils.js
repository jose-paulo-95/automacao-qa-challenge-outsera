/**
 * Utilitários para configuração de rede/interceptações
 * Separado para evitar dependências circulares
 */

/**
 * Configura interceptações de rede para evitar falhas
 */
export function setupNetworkInterceptions() {
  cy.intercept('GET', '**/*.json', { failOnStatusCode: false }).as('apiRequests');
  cy.intercept('POST', '**/*', { failOnStatusCode: false }).as('postRequests');
  cy.intercept('PUT', '**/*', { failOnStatusCode: false }).as('putRequests');
  cy.intercept('DELETE', '**/*', { failOnStatusCode: false }).as('deleteRequests');
}

