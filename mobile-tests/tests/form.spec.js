const { expect } = require('chai');

describe('Mobile Tests - Formulário', () => {
  it('Deve preencher formulário completo com sucesso', async () => {
    // Navegar para tela de formulário
    const formButton = await $('~form-button');
    await formButton.waitForDisplayed({ timeout: 10000 });
    await formButton.click();
    
    // Preencher campos do formulário
    const nameInput = await $('~name-input');
    await nameInput.waitForDisplayed({ timeout: 10000 });
    await nameInput.setValue('John Doe');
    
    const emailInput = await $('~email-input');
    await emailInput.setValue('john.doe@example.com');
    
    const phoneInput = await $('~phone-input');
    await phoneInput.setValue('1234567890');
    
    // Selecionar opção em dropdown
    const countryDropdown = await $('~country-dropdown');
    await countryDropdown.click();
    const countryOption = await $('~country-option-brazil');
    await countryOption.click();
    
    // Submeter formulário
    const submitButton = await $('~submit-button');
    await submitButton.click();
    
    // Validar sucesso
    const successMessage = await $('~form-success-message');
    await successMessage.waitForDisplayed({ timeout: 10000 });
    expect(await successMessage.isDisplayed()).to.be.true;
  });

  it('Deve validar campos obrigatórios do formulário', async () => {
    const formButton = await $('~form-button');
    await formButton.waitForDisplayed({ timeout: 10000 });
    await formButton.click();
    
    // Tentar submeter sem preencher campos
    const submitButton = await $('~submit-button');
    await submitButton.click();
    
    // Validar mensagens de erro
    const nameError = await $('~name-error');
    await nameError.waitForDisplayed({ timeout: 10000 });
    expect(await nameError.isDisplayed()).to.be.true;
  });

  it('Deve validar formato de email', async () => {
    const formButton = await $('~form-button');
    await formButton.waitForDisplayed({ timeout: 10000 });
    await formButton.click();
    
    const emailInput = await $('~email-input');
    await emailInput.setValue('email-invalido');
    
    const submitButton = await $('~submit-button');
    await submitButton.click();
    
    // Validar erro de formato
    const emailError = await $('~email-error');
    await emailError.waitForDisplayed({ timeout: 10000 });
    expect(await emailError.isDisplayed()).to.be.true;
  });
});

