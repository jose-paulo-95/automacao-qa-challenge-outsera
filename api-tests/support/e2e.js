import 'cypress-plugin-api';

// Importar comandos customizados
import './commands';

// Configurações globais
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retornar false aqui previne que o Cypress falhe o teste
  // em caso de exceções não capturadas
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  return true;
});

