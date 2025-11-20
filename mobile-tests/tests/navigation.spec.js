const { expect } = require('chai');

describe('Mobile Tests - Navegação', () => {
  it('Deve navegar para a tela inicial', async () => {
    try {
      const homeButton = await $('~home-button');
      await homeButton.waitForDisplayed({ timeout: 10000 });
      await homeButton.click();
      
      // Validar que está na tela inicial
      const homeScreen = await $('~home-screen');
      await homeScreen.waitForDisplayed({ timeout: 10000 });
      expect(await homeScreen.isDisplayed()).to.be.true;
    } catch (error) {
      console.error('❌ Erro no teste de navegação:', error.message);
      throw new Error(`Elementos não encontrados. Verifique se o app está instalado e os seletores estão corretos. Erro: ${error.message}`);
    }
  }).timeout(60000);

  it('Deve navegar entre telas', async () => {
    try {
      // Navegar para tela de perfil
      const profileButton = await $('~profile-button');
      await profileButton.waitForDisplayed({ timeout: 10000 });
      await profileButton.click();
      
      // Validar tela de perfil
      const profileScreen = await $('~profile-screen');
      await profileScreen.waitForDisplayed({ timeout: 10000 });
      expect(await profileScreen.isDisplayed()).to.be.true;
      
      // Voltar para tela inicial
      const backButton = await $('~back-button');
      await backButton.waitForDisplayed({ timeout: 10000 });
      await backButton.click();
      
      const homeScreen = await $('~home-screen');
      await homeScreen.waitForDisplayed({ timeout: 10000 });
      expect(await homeScreen.isDisplayed()).to.be.true;
    } catch (error) {
      console.error('❌ Erro no teste de navegação entre telas:', error.message);
      throw new Error(`Elementos não encontrados. Verifique se o app está instalado e os seletores estão corretos. Erro: ${error.message}`);
    }
  }).timeout(60000);
});

