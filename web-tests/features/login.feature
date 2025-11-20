@login
Feature: Login na aplicação web
  Como um usuário
  Eu quero fazer login na aplicação
  Para acessar funcionalidades restritas

  Background:
    Given que estou na página de login

  @positive
  Scenario: Login com credenciais válidas
    When eu preencho o username "tomsmith"
    And eu preencho a senha "SuperSecretPassword!"
    And eu clico no botão de login
    Then eu devo ver a mensagem de sucesso
    And eu devo estar logado na aplicação

  @negative
  Scenario: Login com credenciais inválidas
    When eu preencho o username "invaliduser"
    And eu preencho a senha "wrongpassword"
    And eu clico no botão de login
    Then eu devo ver a mensagem de erro
    And eu não devo estar logado na aplicação

  @negative
  Scenario: Login com username vazio
    When eu preencho o username ""
    And eu preencho a senha "SuperSecretPassword!"
    And eu clico no botão de login
    Then eu devo ver a mensagem de erro

  @negative
  Scenario: Login com senha vazia
    When eu preencho o username "tomsmith"
    And eu preencho a senha ""
    And eu clico no botão de login
    Then eu devo ver a mensagem de erro

