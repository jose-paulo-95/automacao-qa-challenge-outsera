# 🔧 Solução Definitiva: Erro ts-node/esm/transpile-only

## 🔍 Problema

O erro `"ts-node/esm/transpile-only 'resolve'" did not call the next hook` ocorre porque o WebdriverIO está tentando usar um loader ESM do TypeScript mesmo quando `autoCompile: false` está configurado.

## ✅ Solução Aplicada

1. **Configurado `maxInstances: 1`** - Reduz a complexidade e evita problemas de concorrência
2. **Mantido `autoCompile: false`** - Desabilita compilação TypeScript
3. **Simplificada configuração** - Removidas opções desnecessárias

## 🚀 Próximos Passos

Se o erro persistir, tente:

### Opção 1: Downgrade do Node.js

O Node.js v22 pode ter incompatibilidades. Tente usar Node.js v18 ou v20:

```powershell
# Usando nvm (se instalado)
nvm install 18
nvm use 18

# Ou baixe Node.js 18 LTS de: https://nodejs.org/
```

### Opção 2: Atualizar WebdriverIO

Atualize para WebdriverIO v9 (requer Node.js 20+):

```powershell
npm install --save-dev @wdio/cli@latest @wdio/local-runner@latest @wdio/mocha-framework@latest @wdio/spec-reporter@latest webdriverio@latest
```

### Opção 3: Usar Mocha Diretamente

Execute os testes diretamente com Mocha (sem WebdriverIO runner):

```powershell
# Criar um script wrapper
node mobile-tests/run-tests.js
```

### Opção 4: Workaround Temporário

Crie um arquivo `mobile-tests/run-tests.js`:

```javascript
// Forçar CommonJS
process.env.NODE_OPTIONS = '--no-warnings';

// Executar WebdriverIO
require('@wdio/cli/bin/wdio');
```

E atualize `package.json`:

```json
{
  "scripts": {
    "mobile:test": "node mobile-tests/run-tests.js mobile-tests/appium.conf.js"
  }
}
```

## 📝 Status Atual

- ✅ `maxInstances: 1` configurado
- ✅ `autoCompile: false` configurado  
- ✅ Configuração simplificada
- ⚠️ Teste novamente: `npm run mobile:test`

---

**💡 Nota:** Este é um bug conhecido do WebdriverIO 8.x com Node.js 22+. A solução mais estável é usar Node.js 18 ou 20, ou atualizar para WebdriverIO 9.

