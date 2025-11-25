# Testes Mobile

Testes automatizados para aplicativos mobile utilizando Appium + WebdriverIO.

## 🚀 Execução

### Pré-requisitos

1. **Appium instalado e rodando:**
```bash
npm run mobile:appium
# ou
appium
```

2. **Emulador/Dispositivo conectado:**
```bash
# Verificar dispositivos Android
adb devices

# Iniciar emulador (se necessário)
emulator -avd NomeDoSeuAVD
```


### Executar Testes

```bash
# Executar todos os testes
npm run mobile:test

# Executar teste específico
npx wdio mobile-tests/appium.conf.js --spec mobile-tests/tests/login.spec.js
```

## 📁 Estrutura

```
mobile-tests/
├── tests/              # Testes (login, navigation, form)
├── capabilities/       # Configurações de capabilities
│   └── config.js
├── apps/               # APKs/IPAs (não versionado)
├── reports/            # Relatórios e logs
└── appium.conf.js      # Configuração do WebdriverIO
```

## ⚙️ Configuração

### Capabilities

Configure em `capabilities/config.js`:
```javascript
capabilities: [{
  platformName: 'Android',
  'appium:deviceName': 'emulator-5554',
  'appium:app': './apps/app.apk'
}]
```

### Variáveis de Ambiente (`.env`)
```env
MOBILE_APP_PATH=./mobile-tests/apps/app.apk
ANDROID_DEVICE_NAME=emulator-5554
```

## 📱 Plataformas Suportadas

- Android (UIAutomator2)
- iOS (XCUITest) - configurável

## 🔧 Troubleshooting

**Erro: "No devices found"**
- Verifique se o emulador está rodando: `adb devices`
- Inicie o emulador antes de executar os testes

**Erro: "App not found"**
- Verifique se o APK está em `mobile-tests/apps/app.apk`
- Ou configure o caminho correto no `.env`

