# 🚀 Quick Start Guide

Guia rápido para começar a usar o projeto de automação QA.

## Instalação Rápida

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env

# 3. Editar .env com suas configurações
```

## Executar Testes

### Testes de API
```bash
npm run api:test
```

### Testes Web E2E
```bash
npm run web:test
```

### Testes Mobile
```bash
# Terminal 1: Iniciar Appium
appium

# Terminal 2: Executar testes
npm run mobile:test
```

### Testes de Carga
```bash
npm run load:test
```

### Todos os Testes
```bash
npm run test:all
```

## Estrutura Rápida

```
api-tests/          → Testes de API (Cypress)
web-tests/          → Testes Web E2E (Cypress + Cucumber)
mobile-tests/       → Testes Mobile (Appium)
load-tests/         → Testes de Carga (K6)
.github/workflows/  → Pipeline CI/CD
```

## Comandos Úteis

```bash
# Abrir Cypress em modo interativo (API)
npm run api:open

# Abrir Cypress em modo interativo (Web)
npm run web:open

# Verificar instalação do Appium
appium doctor

# Verificar dispositivos Android
adb devices
```

## Próximos Passos

1. Leia o [README.md](README.md) completo para detalhes
2. Configure suas URLs de teste no `.env`
3. Execute os testes e verifique os relatórios
4. Customize os testes conforme necessário

## Suporte

- Consulte a seção [Troubleshooting](README.md#-troubleshooting) no README
- Abra uma [Issue](../../issues) se encontrar problemas

---

**Dica:** Comece executando os testes de API, pois são os mais simples e não requerem configuração adicional.

