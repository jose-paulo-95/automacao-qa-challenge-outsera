# 🚀 Projeto de Automação QA - Challenge

## 🎯 Sobre o Projeto

Este projeto foi desenvolvido como um desafio técnico:

- ✅ Testes de API com Cypress
- ✅ Testes E2E Web com Cypress + Cucumber (BDD)
- ✅ Testes Mobile com Appium
- ✅ Testes de Carga com K6
- ✅ Integração CI/CD com GitHub Actions

### CI/CD

Os relatórios consolidados são gerados automaticamente no GitHub Actions e disponibilizados como artefatos.

## 🔄 CI/CD

O projeto inclui pipeline completo no GitHub Actions (`.github/workflows/ci-cd.yml`) que:

1. ✅ Executa testes de API
2. ✅ Executa testes Web E2E
3. ✅ Executa testes de Carga (K6)
4. ✅ Executa testes Mobile (Appium)
5. ✅ Gera relatório consolidado
6. ✅ Faz upload de evidências (vídeos, screenshots, relatórios)

### Configurar Secrets no GitHub

Para usar URLs customizadas, configure os secrets no GitHub:

1. Vá em Settings > Secrets and variables > Actions
2. Adicione os seguintes secrets:
   - `API_BASE_URL`
   - `WEB_BASE_URL`

### Executar Pipeline Localmente

Para testar o pipeline localmente, você pode usar [act](https://github.com/nektos/act):

```bash
act push
```
