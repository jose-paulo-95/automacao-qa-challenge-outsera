# 📋 Explicação Detalhada - Testes de API

## 🎯 Visão Geral

Os testes de API foram desenvolvidos utilizando **Cypress** como ferramenta principal. A escolha do Cypress para testes de API foi estratégica, pois permite unificar a stack tecnológica do projeto e aproveitar recursos como interceptação de requisições, comandos customizados e relatórios integrados.

## 🏗️ Arquitetura e Estrutura

### Estrutura de Pastas

```
api-tests/
├── tests/           # Arquivos de teste (.spec.js)
├── fixtures/        # Dados de teste (JSON)
├── support/         # Comandos customizados e configurações
└── cypress.config.js # Configuração do Cypress
```

### Decisões de Design

1. **Separação por Endpoint**: Cada arquivo de teste (`users.spec.js`, `posts.spec.js`) foca em um endpoint específico, facilitando manutenção e organização.

2. **Uso de Fixtures**: Dados de teste são externalizados em arquivos JSON (`fixtures/users.json`, `fixtures/posts.json`), seguindo o princípio DRY (Don't Repeat Yourself) e facilitando reutilização.

3. **Comandos Customizados**: Criação de comandos reutilizáveis em `support/commands.js` para encapsular lógica comum e melhorar legibilidade.

## 🔧 Componentes Principais

### 1. Comandos Customizados (`support/commands.js`)

#### `cy.apiRequest()`

**Propósito**: Abstrair requisições HTTP com configurações padrão.

**Decisões de Design**:

- Headers padrão (`Content-Type: application/json`) aplicados automaticamente
- `failOnStatusCode: false` para permitir testes de cenários negativos (404, 400, etc.)
- Flexibilidade para adicionar headers customizados quando necessário

**Exemplo de Uso**:

```javascript
cy.apiRequest("GET", `${baseUrl}/users`);
cy.apiRequest("POST", `${baseUrl}/users`, userData, customHeaders);
```

#### `cy.validateJsonSchema()`

**Propósito**: Validar estrutura de objetos JSON de forma recursiva.

**Decisões de Design**:

- Validação recursiva para objetos aninhados (ex: `address.street`)
- Mensagens de erro descritivas indicando o caminho do campo inválido
- Suporte tanto para `response.body` quanto objetos diretos
- Validação de existência de propriedades, não de tipos (flexível para diferentes valores)

**Por que essa abordagem?**

- APIs RESTful frequentemente retornam estruturas complexas
- Validação de schema garante que mudanças na API sejam detectadas
- Mensagens claras facilitam debugging

### 2. Testes de Usuários (`tests/users.spec.js`)

#### GET /users

**Cenários Cobertos**:

1. **Lista de usuários**: Valida status 200, estrutura de array, e que não está vazio
2. **Usuário específico**: Valida busca por ID e estrutura do objeto retornado
3. **Usuário inexistente**: Valida tratamento de erro 404

**Decisões de Design**:

- Uso de `validateJsonSchema()` para garantir estrutura completa do objeto
- Validação de propriedades aninhadas (`address.street`, `address.city`)
- Teste de cenário negativo para garantir robustez da API

#### POST /users

**Cenários Cobertos**:

1. **Criação bem-sucedida**: Valida status 201 e retorno do ID gerado
2. **Validação de campos obrigatórios**: Testa comportamento quando email está ausente

**Decisões de Design**:

- Uso de fixtures para dados de teste (`users.newUser`)
- Validação flexível de status (201 ou 400) pois APIs podem ter comportamentos diferentes
- Validação de que o ID foi gerado, confirmando criação bem-sucedida

#### PUT /users/:id

**Cenários Cobertos**:

1. **Atualização bem-sucedida**: Valida status 200 e dados atualizados

**Decisões de Design**:

- Reutilização de fixtures (`users.updateUser`)
- Validação de que os dados enviados foram persistidos corretamente

#### DELETE /users/:id

**Cenários Cobertos**:

1. **Deleção bem-sucedida**: Valida status 200

**Decisões de Design**:

- Teste simples focado em validar que a operação foi aceita
- Em produção, poderia adicionar validação de que o recurso foi realmente removido

#### Validação de Headers

**Cenários Cobertos**:

1. **Content-Type**: Valida que a resposta é JSON

**Decisões de Design**:

- Validação de headers garante que a API segue padrões RESTful
- Importante para integração com outros sistemas

### 3. Testes de Posts (`tests/posts.spec.js`)

#### GET /posts

**Cenários Cobertos**:

1. **Lista de posts**: Valida estrutura básica
2. **Post específico**: Valida busca por ID
3. **Filtro por userId**: Valida query parameters e filtragem correta

**Decisões de Design**:

- Teste de query parameters (`qs: { userId: 1 }`) demonstra conhecimento de filtros
- Validação de que todos os posts retornados pertencem ao userId especificado
- Estrutura mais simples que users (sem objetos aninhados complexos)

#### POST /posts

**Cenários Cobertos**:

1. **Criação de post**: Valida criação e retorno de ID

**Decisões de Design**:

- Similar ao teste de users, mas focado em posts
- Validação de todos os campos principais (title, body, userId)

#### PUT /posts/:id

**Cenários Cobertos**:

1. **Atualização de post**: Valida atualização de dados

#### DELETE /posts/:id

**Cenários Cobertos**:

1. **Deleção de post**: Valida remoção

#### Cenários Negativos

**Cenários Cobertos**:

1. **404 para post inexistente**: Valida tratamento de erro
2. **Timeout em requisição lenta**: Valida comportamento com timeout configurado

**Decisões de Design**:

- Teste de timeout demonstra preocupação com performance
- Validação flexível de status (200 ou 408) pois timeout pode resultar em diferentes códigos

## ⚙️ Configuração (`cypress.config.js`)

### Decisões de Configuração

1. **Base URL via Environment Variable**:

   - `API_BASE_URL` permite testes em diferentes ambientes (dev, staging, prod)
   - Fallback para URL padrão garante que testes funcionem sem configuração

2. **Timeouts**:

   - `defaultCommandTimeout: 10000` - Tempo razoável para requisições HTTP
   - `requestTimeout: 10000` - Timeout específico para requisições
   - `responseTimeout: 10000` - Timeout para respostas

3. **Vídeos e Screenshots**:
   - `video: true` - Gravação de execução para debugging
   - `screenshotOnRunFailure: true` - Evidências em caso de falha

## 📊 Cobertura de Testes

### Métodos HTTP Cobertos

- ✅ GET (listagem e busca individual)
- ✅ POST (criação)
- ✅ PUT (atualização)
- ✅ DELETE (remoção)

### Tipos de Validação

- ✅ Status codes (200, 201, 404)
- ✅ Estrutura de dados (schema validation)
- ✅ Headers (Content-Type)
- ✅ Query parameters (filtros)
- ✅ Cenários negativos (erros)
- ✅ Timeouts e performance

### Padrões de Teste Aplicados

- ✅ **AAA Pattern** (Arrange, Act, Assert)
- ✅ **Data-Driven Testing** (uso de fixtures)
- ✅ **Positive e Negative Testing**
- ✅ **Boundary Testing** (IDs inexistentes)

## 🎓 Conceitos Demonstrados

### 1. **RESTful API Testing**

- Testes cobrem todos os verbos HTTP principais
- Validação de status codes apropriados
- Teste de query parameters e filtros

### 2. **Test Data Management**

- Externalização de dados em fixtures
- Reutilização de dados entre testes
- Facilita manutenção quando estrutura muda

### 3. **Custom Commands**

- Encapsulamento de lógica comum
- Melhora legibilidade dos testes
- Facilita manutenção e evolução

### 4. **Schema Validation**

- Validação recursiva de estruturas complexas
- Detecção precoce de breaking changes
- Mensagens de erro descritivas

### 5. **Error Handling**

- Testes de cenários negativos
- Validação de tratamento de erros
- Robustez da suite de testes

## 🚀 Pontos Fortes da Implementação

1. **Organização Clara**: Separação lógica por endpoint e tipo de teste
2. **Reutilização**: Comandos customizados e fixtures reduzem duplicação
3. **Manutenibilidade**: Estrutura facilita adicionar novos testes
4. **Robustez**: Cobertura de cenários positivos e negativos
5. **Flexibilidade**: Configuração via environment variables
6. **Documentação**: Código auto-documentado com comentários claros

## 💡 Melhorias Futuras (Para Discussão em Entrevista)

1. **Autenticação**: Adicionar testes de endpoints protegidos (JWT, OAuth)
2. **Rate Limiting**: Testar limites de requisições
3. **Validação de Performance**: Adicionar métricas de tempo de resposta
4. **Contract Testing**: Integração com Pact ou similar
5. **Testes de Integração**: Testar fluxos completos entre endpoints
6. **CI/CD Integration**: Execução automática em pipeline

## 📝 Como Explicar em Entrevista

### Estrutura da Apresentação

1. **Contexto**: "Implementei testes de API usando Cypress para garantir qualidade e confiabilidade dos endpoints RESTful"

2. **Arquitetura**: "Organizei os testes por endpoint, utilizando fixtures para dados de teste e comandos customizados para lógica reutilizável"

3. **Cobertura**: "Cobri todos os métodos HTTP principais (GET, POST, PUT, DELETE) com cenários positivos e negativos, incluindo validação de schema JSON"

4. **Destaques Técnicos**:

   - "Criei um comando customizado `validateJsonSchema()` para validação recursiva de estruturas complexas"
   - "Implementei tratamento de erros robusto com testes de cenários negativos"
   - "Utilizei environment variables para flexibilidade entre ambientes"

5. **Resultados**: "A suite de testes garante que mudanças na API sejam detectadas rapidamente, melhorando a confiabilidade do sistema"

### Perguntas Frequentes e Respostas

**Q: Por que Cypress para testes de API?**
A: Unifica a stack tecnológica do projeto, permite interceptação de requisições, e oferece excelente suporte para testes E2E quando necessário. Além disso, a comunidade é ativa e a documentação é excelente.

**Q: Como você garante que os testes não quebram com mudanças na API?**
A: Utilizo validação de schema JSON que verifica a estrutura completa dos objetos. Se a API mudar, os testes falham imediatamente, alertando sobre breaking changes.

**Q: Como você lida com dados dinâmicos (IDs gerados)?**
A: Uso fixtures para dados estáticos e valido que a API retorna os dados corretos após criação. Para IDs, valido que foram gerados sem verificar valores específicos.

**Q: Você testa performance?**
A: Sim, incluí testes de timeout e validação de tempo de resposta. Em produção, poderia adicionar métricas mais detalhadas com ferramentas como K6.
