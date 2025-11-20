# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2024-01-XX

### Adicionado

- Estrutura completa do projeto de automação QA
- Testes de API com Cypress
  - Testes para endpoints de usuários (GET, POST, PUT, DELETE)
  - Testes para endpoints de posts (GET, POST, PUT, DELETE)
  - Validação de status codes, headers e corpo das respostas
  - Cenários positivos e negativos
- Testes Web E2E com Cypress + Cucumber
  - Feature de login com cenários positivos e negativos
  - Feature de navegação
  - Feature de checkout com validações
  - Implementação do Page Object Pattern
  - Step definitions para todas as features
- Testes Mobile com Appium
  - Testes de login
  - Testes de navegação
  - Testes de formulário
  - Configuração para Android e iOS
- Testes de Carga com K6
  - Script de teste simulando 500 usuários simultâneos
  - Configuração de stages (ramp-up, estabilização, ramp-down)
  - Métricas customizadas (error rate, response time)
  - Thresholds configurados
- Pipeline CI/CD
  - GitHub Actions workflow completo
  - GitLab CI/CD como alternativa
  - Execução automática de todos os tipos de teste
  - Geração de relatórios e upload de evidências
- Documentação completa
  - README detalhado com instruções de instalação e uso
  - Guia de contribuição
  - Exemplos de código
  - Troubleshooting
- Comandos customizados do Cypress
- Fixtures para dados de teste
- Configuração de variáveis de ambiente
- Estrutura organizada por tipo de teste

### Estrutura

- `/api-tests` - Testes de API com Cypress
- `/web-tests` - Testes Web E2E com Cypress + Cucumber
- `/mobile-tests` - Testes Mobile com Appium
- `/load-tests` - Testes de Carga com K6
- `/ci-cd` - Configurações de CI/CD
- `/docs` - Documentação e relatórios

[1.0.0]: https://github.com/usuario/automacao-qa-challenge/releases/tag/v1.0.0
