# 🚀 Projeto de Automação QA - Challenge

Projeto completo de automação de testes QA seguindo as melhores práticas do mercado, utilizando Cypress, K6, Appium e CI/CD.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando os Testes](#executando-os-testes)
- [Relatórios](#relatórios)
- [CI/CD](#cicd)
- [Boas Práticas Implementadas](#boas-práticas-implementadas)
- [Contribuindo](#contribuindo)

## 🎯 Sobre o Projeto

Este projeto foi desenvolvido como um desafio técnico completo de automação de testes QA, demonstrando expertise em:

- ✅ Testes de API com Cypress
- ✅ Testes E2E Web com Cypress + Cucumber (BDD)
- ✅ Testes Mobile com Appium
- ✅ Testes de Carga com K6
- ✅ Integração CI/CD com GitHub Actions
- ✅ Page Object Pattern
- ✅ Clean Code e boas práticas

## 📁 Estrutura do Projeto

```
/automacao-qa-challenge
│
├── docs/                          # Evidências e relatórios
│   └── test-report.md
│
├── README.md                     # Documentação completa
├── package.json                  # Dependências do projeto
├── .gitignore                    # Arquivos ignorados pelo Git
├── .env.example                  # Exemplo de variáveis de ambiente
│
├── .github/workflows/            # Pipeline GitHub Actions
│   └── ci-cd.yml
│
├── api-tests/                    # Cypress para testes de API
│   ├── fixtures/                 # Dados de teste
│   │   ├── users.json
│   │   └── posts.json
│   ├── support/                  # Comandos customizados e configurações
│   │   ├── commands.js
│   │   └── e2e.js
│   ├── tests/                    # Testes de API
│   │   ├── users.spec.js
│   │   └── posts.spec.js
│   ├── videos/                   # Vídeos dos testes (gerado)
│   ├── screenshots/              # Screenshots (gerado)
│   └── cypress.config.js         # Configuração do Cypress para API
│
├── web-tests/                    # Cypress + Cucumber para E2E
│   ├── features/                 # Arquivos .feature (BDD)
│   │   ├── login.feature
│   │   ├── navigation.feature
│   │   └── checkout.feature
│   ├── step_definitions/         # Implementação dos steps
│   │   ├── login.steps.js
│   │   ├── navigation.steps.js
│   │   └── checkout.steps.js
│   ├── page_objects/             # Page Object Pattern
│   │   ├── LoginPage.js
│   │   ├── CheckoutPage.js
│   │   └── NavigationPage.js
│   ├── support/                  # Comandos customizados
│   │   ├── commands.js
│   │   └── e2e.js
│   ├── fixtures/                 # Dados de teste
│   ├── videos/                   # Vídeos dos testes (gerado)
│   ├── screenshots/              # Screenshots (gerado)
│   └── cypress.config.js         # Configuração do Cypress para Web
│
├── mobile-tests/                 # Appium para mobile
│   ├── tests/                    # Testes mobile
│   │   ├── login.spec.js
│   │   ├── navigation.spec.js
│   │   └── form.spec.js
│   ├── capabilities/             # Configurações de capabilities
│   │   └── config.js
│   ├── reports/                  # Relatórios (gerado)
│   ├── apps/                     # APKs/IPAs (não versionado)
│   └── appium.conf.js            # Configuração do Appium
│
├── load-tests/                   # K6 para testes de carga
│   ├── scripts/                  # Scripts de teste de carga
│   │   └── load-test.js
│   ├── reports/                  # Relatórios (gerado)
│   └── k6-config.json            # Configuração do K6
│
└── ci-cd/                        # Configurações CI/CD
    └── github-actions.yml        # Pipeline GitHub Actions
```

## 🛠 Tecnologias Utilizadas

| Tipo de Teste | Ferramenta | Versão |
|--------------|-----------|--------|
| API | Cypress | ^13.6.0 |
| Web (E2E) | Cypress + Cucumber | ^13.6.0 + ^10.3.1 |
| Carga | K6 | Latest |
| Mobile | Appium | ^2.2.0 |
| CI/CD | GitHub Actions | - |

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** (geralmente vem com Node.js)
- **Git**
- **Java JDK 11+** (para Appium)
- **Android SDK** (para testes mobile Android)
- **Xcode** (para testes mobile iOS - apenas macOS)
- **K6** (para testes de carga)

### Instalando K6

**Windows:**
```bash
# Usando Chocolatey
choco install k6

# Ou baixar manualmente de: https://k6.io/docs/getting-started/installation/
```

**Linux:**
```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D9B
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

**macOS:**
```bash
brew install k6
```

## 🚀 Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd automacao-qa-challenge
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

4. **Edite o arquivo `.env` com suas configurações:**
```env
API_BASE_URL=https://jsonplaceholder.typicode.com
WEB_BASE_URL=https://www.saucedemo.com
MOBILE_PLATFORM=Android
MOBILE_DEVICE_NAME=emulator-5554
```

## ⚙️ Configuração

### Configuração do Appium

1. **Instale o Appium globalmente:**
```bash
npm install -g appium
```

2. **Instale os drivers necessários:**
```bash
# Para Android
appium driver install uiautomator2

# Para iOS (apenas macOS)
appium driver install xcuitest
```

3. **Verifique a instalação:**
```bash
appium doctor
```

### Configuração do Android

1. **Instalar Android Studio:**
   - Baixe em: https://developer.android.com/studio
   - Durante a instalação, certifique-se de instalar:
     - Android SDK
     - Android SDK Platform
     - Android Virtual Device (AVD)

2. **Configurar Variáveis de Ambiente:**
   - Adicione ao PATH do Windows:
     - `%LOCALAPPDATA%\Android\Sdk\platform-tools`
     - `%LOCALAPPDATA%\Android\Sdk\tools`
     - `%LOCALAPPDATA%\Android\Sdk\emulator`
   - Crie variável `ANDROID_HOME`:
     - Valor: `%LOCALAPPDATA%\Android\Sdk`

3. **Criar um Emulador:**
   - Abra Android Studio → Virtual Device Manager
   - Clique em "Create Device"
   - Escolha um dispositivo (ex: Pixel 4)
   - Escolha uma imagem (ex: Android 11.0 - API 30)
   - Finalize a criação

4. **Iniciar o Emulador:**
   ```bash
   # Listar emuladores
   emulator -list-avds
   
   # Iniciar emulador
   emulator -avd NomeDoSeuAVD
   ```

5. **Verificar Conexão:**
   ```bash
   adb devices
   ```

**📖 Guia Completo:** Veja `mobile-tests/SETUP_EMULADOR.md` para instruções detalhadas.

## 🧪 Executando os Testes

### Testes de API

**Executar todos os testes de API:**
```bash
npm run api:test
```

**Abrir Cypress em modo interativo:**
```bash
npm run api:open
```

**Executar teste específico:**
```bash
npx cypress run --config-file api-tests/cypress.config.js --spec "api-tests/tests/users.spec.js"
```

### Testes Web E2E

**Executar todos os testes Web:**
```bash
npm run web:test
```

**Abrir Cypress em modo interativo:**
```bash
npm run web:open
```

**Executar feature específica:**
```bash
npx cypress run --config-file web-tests/cypress.config.js --spec "web-tests/features/login.feature"
```

### Testes Mobile

**⚠️ Nota Importante:** Os testes Mobile não são incluídos no comando `test:all` porque requerem configuração adicional (Appium rodando). Execute-os separadamente.

**📖 Guia Completo:** Veja `mobile-tests/COMO_EXECUTAR_TESTES.md` para instruções detalhadas.

**Passos Rápidos:**

1. **Verificar emulador:**
   ```bash
   adb devices
   ```

2. **Se não estiver rodando, iniciar:**
   ```bash
   emulator -avd NomeDoSeuAVD
   ```

3. **Colocar APK na pasta:**
   - Coloque o arquivo `.apk` em `mobile-tests/apps/app.apk`
   - Ou atualize `MOBILE_APP_PATH` no `.env`

4. **Iniciar Appium (Terminal 1):**
   ```bash
   appium
   ```

5. **Executar testes (Terminal 2):**
   ```bash
   npm run mobile:test
   ```

**Executar teste específico:**
```bash
npx wdio mobile-tests/appium.conf.js --spec mobile-tests/tests/login.spec.js
```

**Para executar todos os testes incluindo Mobile:**
```bash
# Terminal 1: Iniciar Appium
appium

# Terminal 2: Executar todos os testes
npm run test:all && npm run mobile:test
```

### Testes de Carga (K6)

**Executar teste de carga:**
```bash
npm run load:test
```

**Executar com configuração customizada:**
```bash
k6 run load-tests/scripts/load-test.js --vus 100 --duration 5m
```

**Executar com variáveis de ambiente:**
```bash
API_BASE_URL=https://api.exemplo.com k6 run load-tests/scripts/load-test.js
```

### Executar Todos os Testes (API, Web e Carga)

```bash
npm run test:all
```

**Nota:** Este comando executa testes de API, Web E2E e Carga. Os testes Mobile não são incluídos automaticamente porque requerem que o servidor Appium esteja rodando. Para executar testes Mobile, use `npm run mobile:test` separadamente após iniciar o Appium.

## 📊 Relatórios

### Cypress

Os relatórios do Cypress são gerados automaticamente após a execução:

- **Vídeos:** `api-tests/videos/` e `web-tests/videos/`
- **Screenshots:** `api-tests/screenshots/` e `web-tests/screenshots/`

### Appium (Mochawesome)

Os relatórios HTML são gerados em:
```
mobile-tests/reports/mobile-test-report-*.html
```

### K6

O K6 exibe o relatório no console durante a execução. Para salvar em arquivo:

```bash
k6 run load-tests/scripts/load-test.js --out json=load-tests/reports/results.json
```

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

## ✨ Boas Práticas Implementadas

### 1. **Page Object Pattern**
- Separação de lógica de teste e seletores
- Reutilização de código
- Facilita manutenção

### 2. **BDD com Cucumber**
- Testes legíveis em linguagem natural
- Colaboração entre equipes técnicas e não-técnicas
- Documentação viva

### 3. **Comandos Customizados**
- Encapsulamento de ações comuns
- Redução de duplicação de código
- Melhor legibilidade

### 4. **Variáveis de Ambiente**
- Configurações centralizadas
- Diferentes ambientes (dev, staging, prod)
- Segurança de credenciais

### 5. **Estrutura Organizada**
- Separação por tipo de teste
- Fácil navegação
- Escalabilidade

### 6. **Tratamento de Erros**
- Validações robustas
- Mensagens de erro claras
- Retry automático quando apropriado

### 7. **Clean Code**
- Nomes descritivos
- Funções pequenas e focadas
- Comentários quando necessário
- DRY (Don't Repeat Yourself)

### 8. **CI/CD Integrado**
- Execução automática
- Feedback rápido
- Histórico de execuções

## 📝 Exemplos de Testes

### Teste de API (Cypress)

```javascript
it('Deve retornar lista de usuários com status 200', () => {
  cy.api({
    method: 'GET',
    url: `${baseUrl}/users`,
  })
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
});
```

### Teste Web E2E (Cucumber)

```gherkin
Scenario: Login com credenciais válidas
  Given que estou na página de login
  When eu preencho o username "tomsmith"
  And eu preencho a senha "SuperSecretPassword!"
  And eu clico no botão de login
  Then eu devo ver a mensagem de sucesso
```

### Teste de Carga (K6)

```javascript
export default function () {
  const response = http.get(`${BASE_URL}/posts`);
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
}
```

## 🐛 Troubleshooting

### Problemas Comuns

**Cypress não encontra os testes:**
- Verifique se o `specPattern` no `cypress.config.js` está correto
- Certifique-se de que os arquivos estão na pasta correta

**Appium não conecta ao dispositivo:**
- Verifique se o dispositivo/emulador está rodando: `adb devices`
- Verifique se o Appium está rodando: `appium`
- Confirme as capabilities no `appium.conf.js`

**K6 não executa:**
- Verifique se o K6 está instalado: `k6 version`
- Verifique a sintaxe do script JavaScript

**Erros de dependências:**
- Delete `node_modules` e `package-lock.json`
- Execute `npm install` novamente

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 👨‍💻 Autor

Desenvolvido como parte de um desafio técnico de automação de testes QA.

---

**⭐ Se este projeto foi útil, considere dar uma estrela!**
