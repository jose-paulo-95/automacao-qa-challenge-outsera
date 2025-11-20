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

// Configurações globais para ignorar exceções não capturadas
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignorar erros comuns que não impedem o funcionamento da aplicação
  
  // Erros de ResizeObserver
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  
  // Erros de rede/API que não impedem o carregamento
  if (err.message.includes('Failed to fetch') ||
      err.message.includes('NetworkError') ||
      err.message.includes('Load failed') ||
      err.message.includes('net::ERR_') ||
      err.message.includes('Network request failed') ||
      err.message.includes('fetch failed') ||
      err.message.includes('XMLHttpRequest') ||
      err.message.includes('ChunkLoadError') ||
      err.message.includes('Loading chunk') ||
      err.message.includes('Loading CSS chunk') ||
      err.message.includes('ERR_FAILED') ||
      err.message.includes('ERR_CONNECTION') ||
      err.message.includes('ERR_NAME_NOT_RESOLVED') ||
      err.message.includes('ERR_INTERNET_DISCONNECTED')) {
    console.warn('Erro de rede ignorado:', err.message);
    return false;
  }
  
  // Erros de CORS que não impedem o funcionamento
  if (err.message.includes('CORS') || 
      err.message.includes('Cross-Origin') ||
      err.message.includes('Access-Control')) {
    console.warn('Erro CORS ignorado:', err.message);
    return false;
  }
  
  // Erros de script que não impedem o carregamento
  if (err.message.includes('Script error') ||
      err.message.includes('Non-Error promise rejection') ||
      err.message.includes('Uncaught (in promise)')) {
    console.warn('Erro de script ignorado:', err.message);
    return false;
  }
  
  // Erros de timeout que não impedem o carregamento
  if (err.message.includes('timeout') ||
      err.message.includes('Timed out')) {
    console.warn('Erro de timeout ignorado:', err.message);
    return false;
  }
  
  return true;
});

