@navigation
Feature: Navegação na aplicação web
  Como um usuário
  Eu quero navegar pela aplicação
  Para acessar diferentes funcionalidades

  @positive
  Scenario: Navegar para página de produtos após login
    Given que estou na página de login
    When eu preencho o username "standard_user"
    And eu preencho a senha "secret_sauce"
    And eu clico no botão de login
    Then eu devo estar na página inicial

  @positive
  Scenario: Navegar para o carrinho
    Given que estou na página de login
    When eu preencho o username "standard_user"
    And eu preencho a senha "secret_sauce"
    And eu clico no botão de login
    And eu clico no link do carrinho
    Then eu devo estar na página do carrinho

  @positive
  Scenario: Validar elementos da página de produtos
    Given que estou na página de login
    When eu preencho o username "standard_user"
    And eu preencho a senha "secret_sauce"
    And eu clico no botão de login
    Then eu devo ver os elementos principais da página

