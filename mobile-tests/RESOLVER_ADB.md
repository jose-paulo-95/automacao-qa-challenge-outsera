# 🔧 Resolver Problema: "adb não é reconhecido"

Este guia ajuda a resolver o erro quando o comando `adb` não é reconhecido no Windows.

## 🔍 Verificar se o Android SDK Está Instalado

### Passo 1: Verificar se o Android SDK Existe

Abra o PowerShell e execute:

```powershell
# Verificar se o Android SDK existe
Test-Path "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe"
```

**Se retornar `True`:** O SDK está instalado, só precisa adicionar ao PATH.

**Se retornar `False`:** O SDK não está instalado ou está em outro local.

### Passo 2: Encontrar o Caminho do Android SDK

**Opção A: Via Android Studio**

1. Abra o Android Studio
2. Vá em **File** → **Settings** (ou **Preferences** no macOS)
3. Vá em **Appearance & Behavior** → **System Settings** → **Android SDK**
4. Veja o campo **Android SDK Location**
5. Copie o caminho (ex: `C:\Users\Jose\AppData\Local\Android\Sdk`)

**Opção B: Verificar Locais Comuns**

```powershell
# Verificar locais comuns
$paths = @(
    "$env:LOCALAPPDATA\Android\Sdk",
    "$env:USERPROFILE\AppData\Local\Android\Sdk",
    "C:\Android\Sdk",
    "C:\Program Files\Android\Sdk"
)

foreach ($path in $paths) {
    if (Test-Path "$path\platform-tools\adb.exe") {
        Write-Host "✅ Encontrado em: $path"
        break
    }
}
```

## ⚙️ Adicionar ao PATH do Windows

### Método 1: Via Interface Gráfica (Recomendado)

1. **Abrir Variáveis de Ambiente:**

   - Pressione `Win + R`
   - Digite: `sysdm.cpl`
   - Pressione Enter
   - Vá na aba **"Avançado"**
   - Clique em **"Variáveis de Ambiente"**

2. **Adicionar ao PATH:**

   - Em **"Variáveis do sistema"**, encontre **"Path"**
   - Clique em **"Editar"**
   - Clique em **"Novo"**
   - Adicione os seguintes caminhos (um por vez):

   ```
   %LOCALAPPDATA%\Android\Sdk\platform-tools
   %LOCALAPPDATA%\Android\Sdk\tools
   %LOCALAPPDATA%\Android\Sdk\emulator
   ```

   **OU se o SDK estiver em outro local, use o caminho completo:**

   ```
   C:\Users\Jose\AppData\Local\Android\Sdk\platform-tools
   C:\Users\Jose\AppData\Local\Android\Sdk\tools
   C:\Users\Jose\AppData\Local\Android\Sdk\emulator
   ```

3. **Criar Variável ANDROID_HOME:**

   - Em **"Variáveis do sistema"**, clique em **"Novo"**
   - Nome: `ANDROID_HOME`
   - Valor: `%LOCALAPPDATA%\Android\Sdk` (ou o caminho completo do seu SDK)
   - Clique em **"OK"**

4. **Aplicar Mudanças:**
   - Clique em **"OK"** em todas as janelas
   - **Feche e reabra o terminal/PowerShell** para aplicar as mudanças

### Método 2: Via PowerShell (Temporário - Apenas para a Sessão Atual)

```powershell
# Adicionar ao PATH apenas para esta sessão
$env:Path += ";$env:LOCALAPPDATA\Android\Sdk\platform-tools"
$env:Path += ";$env:LOCALAPPDATA\Android\Sdk\tools"
$env:Path += ";$env:LOCALAPPDATA\Android\Sdk\emulator"

# Verificar se funcionou
adb version
```

**Nota:** Este método só funciona na sessão atual. Feche o terminal e precisará fazer novamente.

### Método 3: Via PowerShell (Permanente)

```powershell
# Executar como Administrador
# Adicionar ao PATH do sistema permanentemente
$sdkPath = "$env:LOCALAPPDATA\Android\Sdk"
$platformTools = "$sdkPath\platform-tools"
$tools = "$sdkPath\tools"
$emulator = "$sdkPath\emulator"

# Adicionar ao PATH do usuário
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
$newPath = "$currentPath;$platformTools;$tools;$emulator"
[Environment]::SetEnvironmentVariable("Path", $newPath, "User")

# Criar ANDROID_HOME
[Environment]::SetEnvironmentVariable("ANDROID_HOME", $sdkPath, "User")

Write-Host "✅ PATH atualizado! Feche e reabra o terminal."
```

**Importante:** Execute o PowerShell como Administrador para modificar variáveis do sistema.

## ✅ Verificar se Funcionou

1. **Feche e reabra o terminal/PowerShell**

2. **Testar comandos:**

   ```powershell
   # Verificar adb
   adb version

   # Verificar emulador
   emulator -version

   # Verificar ANDROID_HOME
   echo $env:ANDROID_HOME
   ```

3. **Verificar dispositivos:**
   ```powershell
   adb devices
   ```

## 🐛 Se Ainda Não Funcionar

### Problema: SDK não está instalado

**Solução:** Instale o Android Studio:

1. Baixe: https://developer.android.com/studio
2. Durante a instalação, certifique-se de instalar:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device

### Problema: SDK está em outro local

**Solução:**

1. Encontre o caminho do SDK (veja Passo 2 acima)
2. Use o caminho completo ao adicionar ao PATH
3. Atualize a variável ANDROID_HOME com o caminho correto

### Problema: PATH não está sendo aplicado

**Soluções:**

1. **Reiniciar o computador** (garante que todas as variáveis sejam carregadas)
2. **Verificar se o caminho está correto:**
   ```powershell
   # Verificar se o arquivo existe
   Test-Path "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe"
   ```
3. **Verificar PATH atual:**
   ```powershell
   $env:Path -split ';' | Select-String "Android"
   ```

## 📝 Comandos Úteis

```powershell
# Verificar PATH atual
$env:Path

# Verificar se adb está no PATH
Get-Command adb -ErrorAction SilentlyContinue

# Verificar variáveis de ambiente Android
$env:ANDROID_HOME
$env:ANDROID_SDK_ROOT

# Listar todas as variáveis de ambiente
Get-ChildItem Env: | Where-Object Name -like "*ANDROID*"
```

## 🎯 Checklist de Verificação

- [ ] Android SDK instalado
- [ ] Caminho do SDK identificado
- [ ] `platform-tools` adicionado ao PATH
- [ ] `tools` adicionado ao PATH
- [ ] `emulator` adicionado ao PATH
- [ ] `ANDROID_HOME` criado
- [ ] Terminal/PowerShell reiniciado
- [ ] `adb version` funciona
- [ ] `emulator -version` funciona
- [ ] `adb devices` funciona

---

**💡 Dica:** Se você instalou o Android Studio recentemente, pode ser necessário reiniciar o computador para que as variáveis de ambiente sejam aplicadas corretamente.
