const { expect } = require('chai');

describe('Mobile Tests - Formulário', () => {
  it('Deve preencher formulário completo com sucesso', async () => {
    try {
      // Navegar para tela de formulário
      const formButton = await $('~form-button');
      await formButton.waitForDisplayed({ timeout: 10000 });
      await formButton.click();
      
      // Preencher campos do formulário
      const nameInput = await $('~name-input');
      await nameInput.waitForDisplayed({ timeout: 10000 });
      await nameInput.setValue('John Doe');
      
      const emailInput = await $('~email-input');
      await emailInput.waitForDisplayed({ timeout: 10000 });
      await emailInput.setValue('john.doe@example.com');
      
      const phoneInput = await $('~phone-input');
      await phoneInput.waitForDisplayed({ timeout: 10000 });
      await phoneInput.setValue('1234567890');
      
      // Selecionar opção em dropdown
      const countryDropdown = await $('~country-dropdown');
      await countryDropdown.waitForDisplayed({ timeout: 10000 });
      await countryDropdown.click();
      const countryOption = await $('~country-option-brazil');
      await countryOption.waitForDisplayed({ timeout: 10000 });
      await countryOption.click();
      
      // Submeter formulário
      const submitButton = await $('~submit-button');
      await submitButton.waitForDisplayed({ timeout: 10000 });
      await submitButton.click();
      
      // Validar sucesso
      const successMessage = await $('~form-success-message');
      await successMessage.waitForDisplayed({ timeout: 10000 });
      expect(await successMessage.isDisplayed()).to.be.true;
    } catch (error) {
      console.error('❌ Erro no teste de formulário:', error.message);
      throw new Error(`Elementos não encontrados. Verifique se o app está instalado e os seletores estão corretos. Erro: ${error.message}`);
    }
  }).timeout(60000);

  it('Deve validar campos obrigatórios do formulário', async () => {
    try {
      const formButton = await $('~form-button');
      await formButton.waitForDisplayed({ timeout: 10000 });
      await formButton.click();
      
      // Tentar submeter sem preencher campos
      const submitButton = await $('~submit-button');
      await submitButton.waitForDisplayed({ timeout: 10000 });
      await submitButton.click();
      
      // Validar mensagens de erro
      const nameError = await $('~name-error');
      await nameError.waitForDisplayed({ timeout: 10000 });
      expect(await nameError.isDisplayed()).to.be.true;
    } catch (error) {
      console.error('❌ Erro no teste de validação de campos:', error.message);
      throw new Error(`Elementos não encontrados. Verifique se o app está instalado e os seletores estão corretos. Erro: ${error.message}`);
    }
  }).timeout(60000);

  it('Deve validar formato de email', async () => {
    try {
      const formButton = await $('~form-button');
      await formButton.waitForDisplayed({ timeout: 10000 });
      await formButton.click();
      
      const emailInput = await $('~email-input');
      await emailInput.waitForDisplayed({ timeout: 10000 });
      await emailInput.setValue('email-invalido');
      
      const submitButton = await $('~submit-button');
      await submitButton.waitForDisplayed({ timeout: 10000 });
      await submitButton.click();
      
      // Validar erro de formato
      const emailError = await $('~email-error');
      await emailError.waitForDisplayed({ timeout: 10000 });
      expect(await emailError.isDisplayed()).to.be.true;
    } catch (error) {
      console.error('❌ Erro no teste de validação de email:', error.message);
      throw new Error(`Elementos não encontrados. Verifique se o app está instalado e os seletores estão corretos. Erro: ${error.message}`);
    }
  }).timeout(60000);
});

