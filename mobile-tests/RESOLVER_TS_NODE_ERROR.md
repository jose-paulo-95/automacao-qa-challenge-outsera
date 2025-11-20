# 🔧 Resolver Erro: "ts-node/esm/transpile-only 'resolve'"

Este guia ajuda a resolver o erro relacionado ao `ts-node` ao executar testes mobile.

## 🔍 Entendendo o Problema

O erro:
```
Error: "ts-node/esm/transpile-only 'resolve'" did not call the next hook in its chain
```

Ocorre quando o WebdriverIO tenta usar um preprocessor TypeScript mesmo com arquivos JavaScript (.js).

## ✅ Soluções

### Solução 1: Desabilitar Auto-Compile (Já Implementado)

A configuração `autoCompileOpts: { autoCompile: false }` já está no `appium.conf.js`.

### Solução 2: Verificar Versão do WebdriverIO

O problema pode estar relacionado à versão do WebdriverIO. Verifique:

```powershell
npm list webdriverio @wdio/cli
```

### Solução 3: Limpar Cache e Reinstalar

```powershell
# Limpar cache do npm
npm cache clean --force

# Remover node_modules
Remove-Item -Recurse -Force node_modules

# Reinstalar dependências
npm install
```

### Solução 4: Usar Configuração Explícita

Se o problema persistir, tente adicionar ao `appium.conf.js`:

```javascript
exports.config = {
  // ... outras configurações
  autoCompileOpts: {
    autoCompile: false,
    tsNodeOpts: {
      transpileOnly: false,
      compilerOptions: {
        module: 'commonjs'
      }
    }
  },
  // Garantir que não use ESM
  type: undefined
}
```

### Solução 5: Verificar Dependências TypeScript

Verifique se há dependências TypeScript desnecessárias:

```powershell
npm list typescript ts-node
```

Se houver, você pode removê-las (se não forem necessárias):

```powershell
npm uninstall typescript ts-node
```

### Solução 6: Usar Node.js com Flag

Execute os testes com uma flag específica do Node.js:

```powershell
node --loader ./node_modules/@wdio/cli/bin/wdio.js mobile-tests/appium.conf.js
```

Ou adicione ao script no `package.json`:

```json
{
  "scripts": {
    "mobile:test": "NODE_OPTIONS='--no-warnings' wdio mobile-tests/appium.conf.js"
  }
}
```

## 🐛 Troubleshooting

### Verificar Logs Detalhados

Execute com mais verbosidade:

```powershell
DEBUG=* npm run mobile:test
```

### Verificar Versões Compatíveis

Certifique-se de que as versões são compatíveis:

- WebdriverIO: ^8.24.0
- Appium: ^2.2.0
- Node.js: 18.x ou superior

### Verificar Configuração do Mocha

O framework Mocha pode estar tentando usar TypeScript. Verifique `mochaOpts` no `appium.conf.js`.

## 📝 Checklist

- [ ] `autoCompile: false` configurado
- [ ] Versões compatíveis instaladas
- [ ] Cache limpo
- [ ] `node_modules` reinstalado
- [ ] Sem dependências TypeScript desnecessárias
- [ ] Node.js versão 18.x ou superior

---

**💡 Dica:** Se o problema persistir, tente criar um novo projeto WebdriverIO do zero e comparar as configurações.

