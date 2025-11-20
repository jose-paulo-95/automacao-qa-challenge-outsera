# 🔧 Resolver Problema: Emulador "offline"

Este guia ajuda a resolver quando o emulador aparece como `offline` no `adb devices`.

## 🔍 Entendendo o Status

Quando você executa `adb devices`, pode ver:

- **`device`** ✅ - Emulador pronto e conectado
- **`offline`** ⚠️ - Emulador detectado mas não conectado
- **`unauthorized`** 🔒 - Emulador precisa de autorização
- **Nada listado** ❌ - Emulador não detectado

## 🚀 Soluções

### Solução 1: Aguardar o Boot Completo

O emulador pode levar 1-3 minutos para inicializar completamente.

**Passos:**

1. **Aguarde 2-3 minutos** após iniciar o emulador
2. **Verifique se a tela do emulador está totalmente carregada** (não apenas a tela de inicialização)
3. **Execute novamente:**
   ```powershell
   adb devices
   ```

**Sinais de que o emulador está pronto:**
- Tela inicial do Android aparece
- Não há mais animação de boot
- A interface está responsiva

### Solução 2: Reiniciar o ADB

Se o emulador já está rodando mas ainda aparece como `offline`:

```powershell
# Parar o servidor ADB
adb kill-server

# Aguardar 2 segundos
Start-Sleep -Seconds 2

# Reiniciar o servidor ADB
adb start-server

# Verificar dispositivos
adb devices
```

### Solução 3: Reiniciar o Emulador

Se o ADB ainda não detecta corretamente:

1. **Fechar o emulador completamente**
   - Feche a janela do emulador
   - Ou via terminal:
     ```powershell
     adb emu kill
     ```

2. **Aguardar 5 segundos**

3. **Reiniciar o emulador:**
   ```powershell
   # Listar emuladores disponíveis
   emulator -list-avds
   
   # Iniciar o emulador (substitua pelo nome do seu AVD)
   emulator -avd NomeDoSeuAVD
   ```

4. **Aguardar o boot completo (1-3 minutos)**

5. **Verificar novamente:**
   ```powershell
   adb devices
   ```

### Solução 4: Verificar Portas e Processos

Às vezes, processos antigos podem interferir:

```powershell
# Verificar processos do emulador
Get-Process | Where-Object {$_.ProcessName -like "*emulator*"}

# Verificar processos do ADB
Get-Process | Where-Object {$_.ProcessName -like "*adb*"}

# Se houver processos antigos, encerre-os:
# Stop-Process -Name "emulator" -Force
# Stop-Process -Name "adb" -Force
```

### Solução 5: Usar Cold Boot

Iniciar o emulador com cold boot (boot limpo):

```powershell
# Iniciar com cold boot
emulator -avd NomeDoSeuAVD -no-snapshot-load
```

**Nota:** Isso pode demorar mais, mas resolve problemas de estado inconsistente.

### Solução 6: Verificar Configuração do AVD

O AVD pode estar mal configurado:

1. **Abrir Android Studio**
2. **Virtual Device Manager**
3. **Editar o AVD** (ícone de lápis)
4. **Verificar:**
   - **Graphics:** Use "Hardware - GLES 2.0" ou "Automatic"
   - **RAM:** Pelo menos 2GB
   - **VM heap:** 512MB
5. **Salvar e reiniciar o emulador**

### Solução 7: Verificar Firewall/Antivírus

Às vezes, firewall ou antivírus bloqueiam a conexão:

1. **Adicionar exceção** para:
   - `adb.exe`
   - `emulator.exe`
   - Porta `5037` (ADB)
   - Portas `5554-5585` (emuladores)

### Solução 8: Verificar Variáveis de Ambiente

Certifique-se de que o Android SDK está configurado:

```powershell
# Verificar ANDROID_HOME
echo $env:ANDROID_HOME

# Verificar se adb está no PATH
Get-Command adb

# Verificar versão do ADB
adb version
```

## 🔄 Processo Completo de Resolução

Execute estes comandos em ordem:

```powershell
# 1. Parar todos os processos
adb kill-server
Get-Process | Where-Object {$_.ProcessName -like "*emulator*"} | Stop-Process -Force

# 2. Aguardar
Start-Sleep -Seconds 3

# 3. Reiniciar ADB
adb start-server

# 4. Listar emuladores
emulator -list-avds

# 5. Iniciar emulador (substitua pelo nome do seu AVD)
emulator -avd NomeDoSeuAVD

# 6. Aguardar 2-3 minutos para boot completo

# 7. Verificar conexão
adb devices

# 8. Se ainda estiver offline, tentar novamente
adb kill-server
adb start-server
adb devices
```

## ✅ Verificação Final

Quando o emulador estiver pronto, você deve ver:

```powershell
adb devices
```

**Saída esperada:**
```
List of devices attached
emulator-5554    device
```

**Status `device`** significa que está pronto para usar! ✅

## 🐛 Troubleshooting Avançado

### Problema: Emulador inicia mas fica travado

**Solução:**
- Aumente a RAM do AVD (mínimo 2GB)
- Use "Hardware - GLES 2.0" para Graphics
- Desabilite "Use Host GPU" temporariamente

### Problema: Múltiplos emuladores offline

**Solução:**
```powershell
# Limpar todos os emuladores
adb kill-server
Get-Process | Where-Object {$_.ProcessName -like "*emulator*"} | Stop-Process -Force

# Iniciar apenas um
emulator -avd NomeDoSeuAVD
```

### Problema: ADB não encontra o emulador

**Solução:**
```powershell
# Conectar manualmente (se souber a porta)
adb connect 127.0.0.1:5554
```

## 📝 Checklist

- [ ] Emulador está totalmente inicializado (tela do Android visível)
- [ ] Aguardou 2-3 minutos após iniciar
- [ ] ADB server foi reiniciado (`adb kill-server` + `adb start-server`)
- [ ] Emulador foi reiniciado completamente
- [ ] Firewall/Antivírus não está bloqueando
- [ ] AVD está configurado corretamente
- [ ] Apenas um emulador está rodando
- [ ] Status mostra `device` (não `offline`)

---

**💡 Dica:** Mantenha o emulador rodando entre execuções de testes para evitar tempo de inicialização. Só reinicie quando realmente necessário.

