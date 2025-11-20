// ***********************************************************
// Este arquivo é processado e carregado automaticamente antes
// dos arquivos de teste. É um ótimo lugar para colocar configurações
// globais e comportamentos que modificam o Cypress.
//
// Você pode ler mais aqui:
// https://on.cypress.io/configuration
// ***********************************************************

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

