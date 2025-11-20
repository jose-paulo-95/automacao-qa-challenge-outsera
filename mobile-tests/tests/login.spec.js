const { expect } = require('chai');

describe('Mobile Tests - Login', () => {
  before(async () => {
    // Configurações antes dos testes
    console.log('📱 Preparando ambiente para testes de login...');
  });

  after(async () => {
    // Limpeza após os testes
    console.log('🧹 Limpando após testes de login...');
  });

  it('Deve fazer login com credenciais válidas', async () => {
    try {
      // Aguardar elemento de username estar visível
      // Nota: Estes seletores são genéricos e precisam ser ajustados para o app real
      const usernameInput = await $('~username-input');
      await usernameInput.waitForDisplayed({ timeout: 10000 });
      
      // Preencher username
      await usernameInput.setValue('testuser');
      
      // Preencher senha
      const passwordInput = await $('~password-input');
      await passwordInput.waitForDisplayed({ timeout: 10000 });
      await passwordInput.setValue('testpassword');
      
      // Clicar no botão de login
      const loginButton = await $('~login-button');
      await loginButton.waitForDisplayed({ timeout: 10000 });
      await loginButton.click();
      
      // Validar sucesso do login
      const successMessage = await $('~success-message');
      await successMessage.waitForDisplayed({ timeout: 10000 });
      expect(await successMessage.isDisplayed()).to.be.true;
    } catch (error) {
      console.error('❌ Erro no teste de login válido:', error.message);
      // Se os elementos não forem encontrados, o teste falha mas com mensagem clara
      throw new Error(`Elementos não encontrados. Verifique se o app está instalado e os seletores estão corretos. Erro: ${error.message}`);
    }
  }).timeout(60000);

  it('Deve mostrar erro com credenciais inválidas', async () => {
    try {
      const usernameInput = await $('~username-input');
      await usernameInput.waitForDisplayed({ timeout: 10000 });
      await usernameInput.setValue('invaliduser');
      
      const passwordInput = await $('~password-input');
      await passwordInput.waitForDisplayed({ timeout: 10000 });
      await passwordInput.setValue('wrongpassword');
      
      const loginButton = await $('~login-button');
      await loginButton.waitForDisplayed({ timeout: 10000 });
      await loginButton.click();
      
      // Validar mensagem de erro
      const errorMessage = await $('~error-message');
      await errorMessage.waitForDisplayed({ timeout: 10000 });
      expect(await errorMessage.isDisplayed()).to.be.true;
    } catch (error) {
      console.error('❌ Erro no teste de login inválido:', error.message);
      throw new Error(`Elementos não encontrados. Verifique se o app está instalado e os seletores estão corretos. Erro: ${error.message}`);
    }
  }).timeout(60000);

  it('Deve validar campos obrigatórios', async () => {
    try {
      const loginButton = await $('~login-button');
      await loginButton.waitForDisplayed({ timeout: 10000 });
      await loginButton.click();
      
      // Validar que campos obrigatórios são destacados
      const usernameInput = await $('~username-input');
      await usernameInput.waitForDisplayed({ timeout: 10000 });
      const validationError = await usernameInput.getAttribute('content-desc');
      expect(validationError).to.include('required');
    } catch (error) {
      console.error('❌ Erro no teste de validação:', error.message);
      throw new Error(`Elementos não encontrados. Verifique se o app está instalado e os seletores estão corretos. Erro: ${error.message}`);
    }
  }).timeout(60000);
});

