# Testes Mobile - Appium

## ⚠️ Configuração Necessária

### Pré-requisitos

1. **Appium instalado globalmente:**
   ```bash
   npm install -g appium
   ```

2. **Drivers do Appium:**
   ```bash
   # Para Android
   appium driver install uiautomator2

   # Para iOS (apenas macOS)
   appium driver install xcuitest
   ```

3. **Android SDK configurado:**
   - Configure o Android SDK e adicione ao PATH
   - Configure um emulador Android ou conecte um dispositivo físico

4. **Verificar dispositivo:**
   ```bash
   adb devices
   ```

### Arquivo do App

Os testes esperam um arquivo `.apk` (Android) ou `.ipa` (iOS) na pasta `mobile-tests/apps/`.

**Opções:**

1. **Colocar o arquivo do app:**
   - Android: `mobile-tests/apps/app.apk`
   - iOS: `mobile-tests/apps/app.ipa`

2. **Ou configurar no `.env`:**
   ```env
   MOBILE_APP_PATH=./caminho/para/seu/app.apk
   ```

3. **Ou remover a propriedade `app` das capabilities** se o app já estiver instalado no dispositivo

### Configuração no `.env`

```env
MOBILE_PLATFORM=Android
MOBILE_DEVICE_NAME=emulator-5554
MOBILE_APP_PATH=./mobile-tests/apps/app.apk
MOBILE_AUTOMATION_NAME=UiAutomator2
```

## 🚀 Executando os Testes

### Pré-requisito: Iniciar Appium

**Terminal 1:**
```bash
appium
```

**Terminal 2:**
```bash
npm run mobile:test
```

## 📝 Notas Importantes

- Os seletores nos testes são **genéricos** e precisam ser ajustados para o app real
- Os testes usam `content-desc` (accessibility id) como estratégia de seleção
- Se o app não estiver instalado, os testes falharão com mensagens claras
- Verifique os logs em `mobile-tests/reports/` para mais detalhes

## 🔧 Troubleshooting

### Erro: "No devices found"
- Verifique se o dispositivo/emulador está rodando: `adb devices`
- Verifique se o Appium está rodando: `appium`

### Erro: "App not found"
- Coloque o arquivo `.apk` ou `.ipa` na pasta `mobile-tests/apps/`
- Ou configure `MOBILE_APP_PATH` no `.env`

### Erro: "Element not found"
- Os seletores são genéricos e precisam ser ajustados para o app real
- Use `appium inspector` para encontrar os seletores corretos do seu app

