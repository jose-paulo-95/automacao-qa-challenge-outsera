# 🚀 Como Executar Testes Mobile com APK

Este guia mostra como executar os testes mobile após ter o emulador instalado.

## 📋 Checklist Pré-Execução

Antes de começar, verifique:

- [ ] Emulador Android instalado e funcionando
- [ ] Android SDK configurado (ANDROID_HOME)
- [ ] ADB funcionando (`adb devices`)
- [ ] Appium instalado globalmente
- [ ] Driver UiAutomator2 instalado
- [ ] APK do app para testar

## 🔍 Passo 1: Verificar se o Emulador Está Rodando

```bash
# Verificar dispositivos conectados
adb devices

# Deve mostrar algo como:
# List of devices attached
# emulator-5554    device
```

**Se não houver dispositivo:**

```bash
# Listar emuladores disponíveis
emulator -list-avds

# Iniciar um emulador (substitua pelo nome do seu AVD)
emulator -avd Pixel_4_API_30
```

Aguarde o emulador inicializar completamente (1-2 minutos).

## 📱 Passo 2: Obter um APK para Testar

### Opção A: Usar um APK de Exemplo

Você pode baixar um APK de exemplo ou usar um app de teste:

1. **APK de Teste Recomendado:**

   - **Sauce Labs Demo App:** https://github.com/saucelabs/sample-app-mobile/releases
   - Baixe o arquivo `.apk` (Android)
   - Coloque em: `mobile-tests/apps/app.apk`

2. **Ou use qualquer APK que você tenha:**
   - Coloque o arquivo `.apk` na pasta `mobile-tests/apps/`
   - Renomeie para `app.apk` ou atualize o `.env`

### Opção B: Usar App Já Instalado no Emulador

Se você já tem um app instalado no emulador, pode testar sem APK:

1. Instale o app manualmente no emulador (arraste o APK para o emulador)
2. Configure o `.env` sem o caminho do APK (já está configurado assim)

## ⚙️ Passo 3: Configurar o Projeto

### 3.1. Atualizar o arquivo `.env`:

```env
MOBILE_PLATFORM=Android
MOBILE_DEVICE_NAME=emulator-5554
MOBILE_APP_PATH=./mobile-tests/apps/app.apk
MOBILE_AUTOMATION_NAME=UiAutomator2
```

**Importante:**

- `MOBILE_DEVICE_NAME` deve corresponder ao nome mostrado por `adb devices`
- Se você não tiver APK, o sistema tentará usar o app já instalado

### 3.2. Verificar o Nome do Dispositivo:

```bash
adb devices
```

O nome será algo como:

- `emulator-5554` (padrão)
- `emulator-5556` (se houver múltiplos)

Atualize o `.env` com o nome correto.

## 🔧 Passo 4: Instalar Driver do Appium

```bash
# Instalar driver UiAutomator2 para Android (versão compatível com Appium 2.x)
npx appium driver install uiautomator2@2.34.1

# Verificar drivers instalados
npx appium driver list
```

**Nota:** Se você instalou o Appium globalmente, pode usar `appium` diretamente. Caso contrário, use `npx appium`.

**Nota:** Se você instalou o Appium globalmente, pode usar `appium` diretamente. Caso contrário, use `npx appium`.

## 🧪 Passo 5: Executar os Testes

### 5.1. Iniciar o Appium (Terminal 1):

**Opção A: Usando npx (Recomendado):**

```bash
npx appium
```

**Opção B: Usando script npm:**

```bash
npm run mobile:appium
```

**Opção C: Se instalou globalmente:**

```bash
appium
```

Você deve ver algo como:

```
[Appium] Welcome to Appium v2.x.x
[Appium] Appium REST http interface listener started on 0.0.0.0:4723
```

**Mantenha este terminal aberto!**

### 5.2. Executar os Testes (Terminal 2):

```bash
# Executar todos os testes mobile
npm run mobile:test
```

## 📊 Passo 6: Verificar os Resultados

### Durante a Execução:

Você verá os testes sendo executados no terminal e no emulador.

### Após a Execução:

1. **Relatórios HTML:**

   - Localização: `mobile-tests/reports/mobile-test-report-*.html`
   - Abra no navegador para ver detalhes

2. **Logs do Appium:**
   - Localização: `mobile-tests/reports/appium.log`

## 🔍 Passo 7: Ajustar Seletores (Se Necessário)

Os testes atuais usam seletores genéricos. Para funcionar com seu APK, você precisa:

### 7.1. Encontrar os Seletores Corretos:

**Opção A: Usar Appium Inspector**

1. Baixe o Appium Inspector: https://github.com/appium/appium-inspector/releases
2. Conecte ao emulador
3. Inspecione os elementos do app
4. Copie os seletores corretos

**Opção B: Usar UIAutomatorViewer (Android)**

```bash
# Abrir UIAutomatorViewer
uiautomatorviewer
```

### 7.2. Atualizar os Testes:

Edite os arquivos em `mobile-tests/tests/` e substitua os seletores genéricos pelos corretos do seu app.

**Exemplo:**

```javascript
// Antes (genérico)
const usernameInput = await $("~username-input");

// Depois (específico do seu app)
const usernameInput = await $("id=com.example.app:id/username");
// ou
const usernameInput = await $(
  'xpath=//android.widget.EditText[@content-desc="Username"]'
);
```

## 🐛 Troubleshooting

### Problema: "No devices found"

**Solução:**

```bash
# Verificar se o emulador está rodando
adb devices

# Se não estiver, iniciar
emulator -avd NomeDoSeuAVD

# Reiniciar adb se necessário
adb kill-server
adb start-server
```

### Problema: "App not installed"

**Solução:**

- Verifique se o caminho do APK está correto no `.env`
- Verifique se o arquivo APK existe: `ls mobile-tests/apps/`
- Tente instalar manualmente: `adb install mobile-tests/apps/app.apk`

### Problema: "Element not found"

**Solução:**

- Os seletores são genéricos e precisam ser ajustados para seu app
- Use Appium Inspector ou UIAutomatorViewer para encontrar os seletores corretos
- Atualize os arquivos de teste com os seletores corretos

### Problema: "Porta 4723 já em uso"

**Solução:**

```bash
# Encontrar processo usando a porta
netstat -ano | findstr :4723

# Matar o processo (substitua PID pelo número encontrado)
taskkill /PID <PID> /F
```

### Problema: Testes falham com timeout

**Solução:**

- Aumente o timeout nos testes (já está em 60000ms)
- Verifique se o app está respondendo corretamente
- Verifique se os seletores estão corretos

## 📝 Exemplo Completo de Execução

```bash
# 1. Verificar emulador
adb devices

# 2. Se não estiver rodando, iniciar
emulator -avd Pixel_4_API_30

# 3. Aguardar inicialização (1-2 minutos)

# 4. Verificar novamente
adb devices

# 5. Iniciar Appium (Terminal 1)
appium

# 6. Executar testes (Terminal 2)
npm run mobile:test
```

## 🎯 Próximos Passos

1. **Ajustar Seletores:** Use Appium Inspector para encontrar os seletores corretos do seu app
2. **Adicionar Mais Testes:** Crie novos testes baseados nas funcionalidades do seu app
3. **Integrar com CI/CD:** Configure o pipeline para executar testes mobile automaticamente

## 💡 Dicas

- **Mantenha o emulador rodando** para evitar tempo de inicialização
- **Use Appium Inspector** para debugar e encontrar seletores
- **Teste com diferentes versões do Android** (crie múltiplos AVDs)
- **Use screenshots** para debug quando os testes falharem

---

**📚 Recursos:**

- [Appium Inspector](https://github.com/appium/appium-inspector)
- [Documentação Appium](https://appium.io/docs/en/about-appium/intro/)
- [Seletores Appium](https://appium.io/docs/en/writing-running-appium/finding-elements/)
