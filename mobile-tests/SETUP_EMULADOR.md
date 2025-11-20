# 📱 Guia de Instalação do Emulador Android

Este guia explica como instalar e configurar um emulador Android no Windows para executar os testes mobile.

## 📋 Pré-requisitos

1. **Java JDK** (versão 8 ou superior)
2. **Android Studio** (recomendado) ou **Android SDK** standalone
3. **Pelo menos 8GB de RAM** (recomendado 16GB)
4. **Espaço em disco**: ~10GB para Android Studio + SDK + Emulador

## 🚀 Opção 1: Instalação via Android Studio (Recomendado)

### Passo 1: Instalar Android Studio

1. **Baixar Android Studio:**

   - Acesse: https://developer.android.com/studio
   - Baixe a versão para Windows
   - Execute o instalador

2. **Durante a instalação:**
   - Marque "Android SDK"
   - Marque "Android SDK Platform"
   - Marque "Android Virtual Device"
   - Escolha o diretório de instalação (padrão: `C:\Users\SeuUsuario\AppData\Local\Android\Sdk`)

### Passo 2: Configurar Variáveis de Ambiente

1. **Adicionar ao PATH do Windows:**

   Adicione as seguintes pastas ao PATH do sistema:

   ```
   C:\Users\Jose\AppData\Local\Android\Sdk\platform-tools
   C:\Users\Jose\AppData\Local\Android\Sdk\tools
  C:\Users\Jose\AppData\Local\Android\Sdk\emulator
   ```

   **Como adicionar ao PATH:**

   - Pressione `Win + R`, digite `sysdm.cpl` e pressione Enter
   - Vá em "Avançado" → "Variáveis de Ambiente"
   - Em "Variáveis do sistema", encontre "Path" e clique em "Editar"
   - Clique em "Novo" e adicione cada caminho acima
   - Clique em "OK" em todas as janelas

2. **Criar variável ANDROID_HOME:**

   - Na mesma janela de "Variáveis de Ambiente"
   - Em "Variáveis do sistema", clique em "Novo"
   - Nome: `ANDROID_HOME`
   - Valor: `C:\Users\SeuUsuario\AppData\Local\Android\Sdk`
   - Clique em "OK"

3. **Reiniciar o terminal/PowerShell** para aplicar as mudanças

### Passo 3: Verificar Instalação

Abra um novo terminal e execute:

```bash
# Verificar se adb está disponível
adb version

# Verificar se o emulador está disponível
emulator -version

# Verificar se o Android SDK está configurado
echo $env:ANDROID_HOME  # PowerShell
# ou
echo %ANDROID_HOME%     # CMD
```

### Passo 4: Criar um Emulador via Android Studio

1. **Abrir Android Studio**
2. **Configurar SDK:**

   - Vá em "More Actions" → "SDK Manager"
   - Na aba "SDK Platforms", instale:
     - Android 11.0 (API 30) ou superior
     - Android 10.0 (API 29) - opcional
   - Na aba "SDK Tools", certifique-se de que está instalado:
     - Android SDK Build-Tools
     - Android Emulator
     - Android SDK Platform-Tools
     - Intel x86 Emulator Accelerator (HAXM installer) - para melhor performance

3. **Criar AVD (Android Virtual Device):**
   - Vá em "More Actions" → "Virtual Device Manager"
   - Clique em "Create Device"
   - Escolha um dispositivo (ex: Pixel 4, Pixel 5)
   - Escolha uma imagem do sistema (ex: Android 11.0 - API 30)
   - Clique em "Next"
   - Configure o nome do AVD (ex: "Pixel_4_API_30")
   - Clique em "Finish"

### Passo 5: Iniciar o Emulador

**Opção A: Via Android Studio**

- Abra "Virtual Device Manager"
- Clique no botão "Play" ao lado do AVD criado

**Opção B: Via Linha de Comando**

```bash
# Listar emuladores disponíveis
emulator -list-avds

# Iniciar um emulador específico
emulator -avd Pixel_4_API_30

# Ou iniciar com opções de performance
emulator -avd Pixel_4_API_30 -gpu host -memory 2048
```

### Passo 6: Verificar se o Emulador Está Rodando

```bash
# Verificar dispositivos conectados
adb devices

# Deve mostrar algo como:
# List of devices attached
# emulator-5554    device
```

## 🚀 Opção 2: Instalação via Chocolatey (Mais Rápido)

Se você tem o Chocolatey instalado:

```powershell
# Instalar Android SDK
choco install android-sdk -y

# Instalar Android Studio
choco install androidstudio -y
```

Depois, siga os passos 2-6 da Opção 1.

## 🔧 Configuração para os Testes

### 1. Atualizar o arquivo `.env`:

```env
MOBILE_PLATFORM=Android
MOBILE_DEVICE_NAME=emulator-5554
MOBILE_APP_PATH=./mobile-tests/apps/app.apk
MOBILE_AUTOMATION_NAME=UiAutomator2
```

**Nota:** O `MOBILE_DEVICE_NAME` deve corresponder ao nome do dispositivo mostrado por `adb devices`.

### 2. Verificar o Nome do Dispositivo:

```bash
adb devices
```

O nome será algo como:

- `emulator-5554` (padrão)
- `emulator-5556` (se houver múltiplos emuladores)

### 3. Instalar Appium Drivers:

```bash
# Instalar driver UiAutomator2 para Android
appium driver install uiautomator2

# Verificar drivers instalados
appium driver list
```

## 🧪 Testar a Configuração

1. **Iniciar o emulador:**

   ```bash
   emulator -avd NomeDoSeuAVD
   ```

2. **Aguardar o emulador inicializar completamente** (pode levar 1-2 minutos)

3. **Verificar conexão:**

   ```bash
   adb devices
   ```

4. **Iniciar Appium:**

   ```bash
   appium
   ```

5. **Em outro terminal, executar os testes:**
   ```bash
   npm run mobile:test
   ```

## ⚡ Melhorar Performance do Emulador

### 1. Habilitar Aceleração de Hardware (HAXM):

- No Android Studio: SDK Manager → SDK Tools → Intel x86 Emulator Accelerator (HAXM installer)
- Ou baixe diretamente: https://github.com/intel/haxm/releases

### 2. Configurar Memória do Emulador:

- Ao criar o AVD, configure:
  - RAM: 2048 MB (mínimo) ou 4096 MB (recomendado)
  - VM heap: 512 MB

### 3. Usar Imagens x86/x86_64:

- Prefira imagens x86 ou x86_64 em vez de ARM
- São mais rápidas em emuladores

## 🐛 Troubleshooting

### Problema: "adb: command not found"

**Solução:** Adicione `platform-tools` ao PATH (veja Passo 2)

### Problema: "emulator: command not found"

**Solução:** Adicione `emulator` ao PATH (veja Passo 2)

### Problema: Emulador muito lento

**Soluções:**

- Habilite HAXM (veja seção de Performance)
- Aumente a RAM alocada
- Use imagens x86 em vez de ARM
- Feche outros programas pesados

### Problema: "No devices found" no Appium

**Soluções:**

- Verifique se o emulador está rodando: `adb devices`
- Aguarde o emulador inicializar completamente
- Reinicie o adb: `adb kill-server && adb start-server`

### Problema: Porta 4723 já em uso

**Solução:**

```bash
# Encontrar processo usando a porta
netstat -ano | findstr :4723

# Matar o processo (substitua PID pelo número encontrado)
taskkill /PID <PID> /F
```

## 📚 Recursos Adicionais

- **Documentação Android:** https://developer.android.com/studio/run/emulator
- **Documentação Appium:** https://appium.io/docs/en/about-appium/intro/
- **Android SDK Command Line Tools:** https://developer.android.com/studio/command-line

## ✅ Checklist de Verificação

- [ ] Android Studio instalado
- [ ] ANDROID_HOME configurado
- [ ] PATH atualizado com platform-tools, tools e emulator
- [ ] Android SDK instalado (API 30 ou superior)
- [ ] AVD criado e funcionando
- [ ] `adb devices` mostra o emulador
- [ ] Appium driver uiautomator2 instalado
- [ ] Emulador inicia corretamente
- [ ] Testes mobile executam sem erros de conexão

---

**💡 Dica:** Para desenvolvimento, é recomendado manter o emulador sempre rodando para evitar o tempo de inicialização a cada execução de testes.
