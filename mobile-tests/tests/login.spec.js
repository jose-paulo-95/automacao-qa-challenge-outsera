const { expect } = require('chai');

describe('Mobile Tests - Login', () => {
  before(() => {
    // Configurações antes dos testes
  });

  after(() => {
    // Limpeza após os testes
  });

  it('Deve fazer login com credenciais válidas', async () => {
    // Aguardar elemento de username estar visível
    const usernameInput = await $('~username-input');
    await usernameInput.waitForDisplayed({ timeout: 10000 });
    
    // Preencher username
    await usernameInput.setValue('testuser');
    
    // Preencher senha
    const passwordInput = await $('~password-input');
    await passwordInput.setValue('testpassword');
    
    // Clicar no botão de login
    const loginButton = await $('~login-button');
    await loginButton.click();
    
    // Validar sucesso do login
    const successMessage = await $('~success-message');
    await successMessage.waitForDisplayed({ timeout: 10000 });
    expect(await successMessage.isDisplayed()).to.be.true;
  });

  it('Deve mostrar erro com credenciais inválidas', async () => {
    const usernameInput = await $('~username-input');
    await usernameInput.waitForDisplayed({ timeout: 10000 });
    await usernameInput.setValue('invaliduser');
    
    const passwordInput = await $('~password-input');
    await passwordInput.setValue('wrongpassword');
    
    const loginButton = await $('~login-button');
    await loginButton.click();
    
    // Validar mensagem de erro
    const errorMessage = await $('~error-message');
    await errorMessage.waitForDisplayed({ timeout: 10000 });
    expect(await errorMessage.isDisplayed()).to.be.true;
  });

  it('Deve validar campos obrigatórios', async () => {
    const loginButton = await $('~login-button');
    await loginButton.click();
    
    // Validar que campos obrigatórios são destacados
    const usernameInput = await $('~username-input');
    const validationError = await usernameInput.getAttribute('content-desc');
    expect(validationError).to.include('required');
  });
});

