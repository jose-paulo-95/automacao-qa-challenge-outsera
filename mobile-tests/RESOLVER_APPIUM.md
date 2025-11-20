# 🔧 Resolver Problema: "appium não é reconhecido"

Este guia ajuda a resolver quando o comando `appium` não é reconhecido no Windows.

## 🔍 Entendendo o Problema

O Appium está instalado **localmente** no projeto, mas não está no PATH global do Windows. Isso significa que você não pode executar `appium` diretamente no terminal.

## ✅ Soluções

### Solução 1: Usar npx (Recomendado - Mais Rápido)

Use `npx` para executar o Appium instalado localmente:

```powershell
npx appium
```

**Vantagens:**
- ✅ Não precisa instalar globalmente
- ✅ Usa a versão exata do projeto
- ✅ Funciona imediatamente

### Solução 2: Usar Script npm (Mais Conveniente)

Use o script npm configurado no projeto:

```powershell
npm run mobile:appium
```

**Vantagens:**
- ✅ Mais fácil de lembrar
- ✅ Usa a versão do projeto
- ✅ Consistente com outros comandos do projeto

### Solução 3: Instalar Globalmente (Opcional)

Se você quiser usar `appium` diretamente em qualquer lugar:

```powershell
# Instalar Appium globalmente
npm install -g appium

# Verificar instalação
appium --version
```

**Nota:** Após instalar globalmente, você precisará instalar os drivers também:

```powershell
# Instalar driver UiAutomator2 para Android
appium driver install uiautomator2

# Verificar drivers instalados
appium driver list
```

## 🚀 Como Executar os Testes

### Opção A: Usando npx (Recomendado)

**Terminal 1 - Iniciar Appium:**
```powershell
npx appium
```

**Terminal 2 - Executar Testes:**
```powershell
npm run mobile:test
```

### Opção B: Usando Script npm

**Terminal 1 - Iniciar Appium:**
```powershell
npm run mobile:appium
```

**Terminal 2 - Executar Testes:**
```powershell
npm run mobile:test
```

### Opção C: Appium Global (Se instalado)

**Terminal 1 - Iniciar Appium:**
```powershell
appium
```

**Terminal 2 - Executar Testes:**
```powershell
npm run mobile:test
```

## 📝 Verificar se o Appium Está Funcionando

Após iniciar o Appium, você deve ver algo como:

```
[Appium] Welcome to Appium v2.x.x
[Appium] Appium REST http interface listener started on 0.0.0.0:4723
```

**Mantenha este terminal aberto enquanto executa os testes!**

## 🔧 Instalar Drivers do Appium

Se você instalou o Appium globalmente, precisa instalar os drivers:

```powershell
# Instalar driver UiAutomator2 (Android) - versão compatível com Appium 2.x
npx appium driver install uiautomator2@2.34.1

# Ou se instalou globalmente:
appium driver install uiautomator2@2.34.1

# Instalar driver XCUITest (iOS - opcional)
npx appium driver install xcuitest

# Verificar drivers instalados
npx appium driver list
```

**Nota:** A versão do driver deve ser compatível com a versão do Appium instalada. Para Appium 2.x, use `uiautomator2@2.34.1`.

## 🐛 Troubleshooting

### Problema: "Driver not installed"

**Solução:**
```powershell
# Instalar driver UiAutomator2
npx appium driver install uiautomator2

# Ou se instalou globalmente:
appium driver install uiautomator2
```

### Problema: "Port 4723 already in use"

**Solução:**
```powershell
# Encontrar processo usando a porta
netstat -ano | findstr :4723

# Matar o processo (substitua PID pelo número encontrado)
taskkill /PID <PID> /F

# Ou simplesmente feche o terminal onde o Appium está rodando
```

### Problema: "Cannot find module 'appium'"

**Solução:**
```powershell
# Reinstalar dependências
npm install

# Verificar se está instalado
npm list appium
```

## 📋 Checklist

- [ ] Appium instalado localmente (`npm list appium`)
- [ ] Driver UiAutomator2 instalado (`npx appium driver list`)
- [ ] Emulador rodando (`adb devices`)
- [ ] Appium iniciado (`npx appium` ou `npm run mobile:appium`)
- [ ] Appium escutando na porta 4723
- [ ] Testes executados em outro terminal (`npm run mobile:test`)

## 💡 Dicas

1. **Use `npx appium`** - É a forma mais simples e não requer instalação global
2. **Mantenha o Appium rodando** - Não feche o terminal enquanto executa testes
3. **Use scripts npm** - Mais fácil de lembrar e consistente
4. **Verifique os drivers** - Certifique-se de que o driver UiAutomator2 está instalado

---

**📚 Recursos:**
- [Documentação Appium](https://appium.io/docs/en/about-appium/intro/)
- [Appium Drivers](https://appium.io/docs/en/2.1/guides/drivers/)

