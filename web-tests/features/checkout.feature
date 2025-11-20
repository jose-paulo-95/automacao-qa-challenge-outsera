@checkout
Feature: Processo de checkout
  Como um usuário
  Eu quero completar o checkout
  Para finalizar minha compra

  Background:
    Given que estou na página de checkout

  @positive
  Scenario: Checkout completo com dados válidos
    When eu preencho o primeiro nome "John"
    And eu preencho o último nome "Doe"
    And eu preencho o código postal "12345"
    And eu clico no botão continuar
    And eu clico no botão finalizar
    Then eu devo ver a mensagem de sucesso do checkout
    And eu devo ver "Thank you for your order!"

  @negative
  Scenario: Checkout com primeiro nome vazio
    When eu preencho o primeiro nome ""
    And eu preencho o último nome "Doe"
    And eu preencho o código postal "12345"
    And eu clico no botão continuar
    Then eu devo ver a mensagem de erro
    And eu devo ver "First Name is required"

  @negative
  Scenario: Checkout com código postal inválido
    When eu preencho o primeiro nome "John"
    And eu preencho o último nome "Doe"
    And eu preencho o código postal "ABC"
    And eu clico no botão continuar
    Then eu devo ver a mensagem de erro

  @positive
  Scenario: Validar itens no carrinho antes do checkout
    Given que tenho itens no carrinho
    When eu visualizo o carrinho
    Then eu devo ver os itens no carrinho
    And eu devo ver o preço total

