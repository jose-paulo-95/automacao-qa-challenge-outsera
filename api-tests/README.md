# Testes de API

Testes de API REST utilizando Cypress para validação de endpoints, status codes e estruturas de resposta.

## 🚀 Execução

```bash
# Executar todos os testes
npm run api:test

# Abrir interface do Cypress
npm run api:open
```

## 📁 Estrutura

```
api-tests/
├── tests/           # Testes de API (users.spec.js, posts.spec.js)
├── fixtures/        # Dados de teste (users.json, posts.json)
├── support/         # Comandos customizados e configurações
└── cypress.config.js
```

## 🎯 Endpoints Testados

- **Users**: GET, POST, PUT, DELETE
- **Posts**: GET, POST, PUT, DELETE

## 📝 Comandos Customizados

### `cy.apiRequest()`

Faz requisições API com tratamento de erros:

```javascript
cy.apiRequest("GET", "/users/1");
cy.apiRequest("POST", "/posts", { title: "Test", body: "Content" });
```

### `cy.validateJsonSchema()`

Valida estrutura de resposta JSON:

```javascript
cy.validateJsonSchema(response.body, {
  id: null,
  name: null,
  email: null,
});
```

## ⚙️ Configuração

Variáveis de ambiente (`.env`):

```env
API_BASE_URL=https://jsonplaceholder.typicode.com
API_TIMEOUT=10000
```

## 📊 Exemplo de Teste

```javascript
it("Deve retornar usuário por ID", () => {
  cy.apiRequest("GET", "/users/1").then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property("id");
  });
});
```
