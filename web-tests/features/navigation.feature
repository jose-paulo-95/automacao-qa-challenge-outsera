@navigation
Feature: Navegação na aplicação web
  Como um usuário
  Eu quero navegar pela aplicação
  Para acessar diferentes funcionalidades

  @positive
  Scenario: Navegar para página inicial
    Given que estou na página de login
    When eu clico no link de home
    Then eu devo estar na página inicial

  @positive
  Scenario: Navegar para página de login
    Given que estou na página inicial
    When eu clico no link de login
    Then eu devo estar na página de login

  @positive
  Scenario: Validar elementos da página inicial
    Given que estou na página inicial
    Then eu devo ver os elementos principais da página

