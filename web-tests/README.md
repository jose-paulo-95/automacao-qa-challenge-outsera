# Testes Web E2E

Testes end-to-end utilizando Cypress + Cucumber (BDD) seguindo Page Object Pattern e Clean Code.

## 🚀 Execução

```bash
# Executar todos os testes
npm run web:test

# Abrir interface do Cypress
npm run web:open
```

## 📁 Estrutura

```
web-tests/
├── constants/          # Seletores, URLs, mensagens, timeouts
├── fixtures/           # Dados de teste (JSON)
├── page_objects/       # Page Objects (Login, Product, Cart, Checkout, Navigation)
├── step_definitions/  # Implementação dos steps BDD
├── utils/             # Helpers reutilizáveis
└── features/          # Arquivos .feature (BDD)
```

## 🎯 Princípios

- **Sem código hardcoded**: Use fixtures e constantes
- **Page Objects**: Toda interação com UI via Page Objects
- **Helpers**: Ações comuns em `utils/testHelpers.js`
- **Centralização**: Seletores em `constants/selectors.js`

## 📝 Exemplos

### Adicionar novo Page Object

```javascript
import { SELECTORS } from '../constants/selectors';
import { URLS } from '../constants/urls';

class NewPage {
  constructor() {
    this.url = URLS.NEW_PAGE;
    this.selectors = SELECTORS.NEW_PAGE;
  }
  visit() {
    cy.visit(this.url);
    return this;
  }
}
export default new NewPage();
```

### Usar helpers

```javascript
import { loginWithFixture, setupCheckoutFlow } from '../utils/testHelpers';

// Login com fixture
loginWithFixture('validUser');

// Setup completo para checkout
setupCheckoutFlow();
```

## ⚙️ Configuração

Variáveis de ambiente (`.env`):
```env
WEB_BASE_URL=https://www.saucedemo.com
WEB_TIMEOUT=30000
```
