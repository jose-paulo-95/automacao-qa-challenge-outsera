# Testes de Carga

Testes de carga e performance utilizando K6 para validar capacidade e performance da API.

## 🚀 Execução

```bash
# Executar teste de carga padrão
npm run load:test

# Executar com configuração customizada
k6 run load-tests/scripts/load-test.js --vus 100 --duration 5m

# Executar com variáveis de ambiente
API_BASE_URL=https://api.exemplo.com k6 run load-tests/scripts/load-test.js
```

## 📁 Estrutura

```
load-tests/
├── scripts/           # Scripts de teste de carga
│   └── load-test.js
├── k6-config.json     # Configuração de cenários e thresholds
└── reports/           # Relatórios gerados
```

## ⚙️ Configuração

### Cenários (k6-config.json)

```json
{
  "scenarios": {
    "load_test": {
      "executor": "ramping-vus",
      "stages": [
        { "duration": "1m", "target": 100 },
        { "duration": "3m", "target": 500 }
      ]
    }
  }
}
```

### Thresholds

Limites de performance configurados:
- `http_req_duration`: p(95) < 500ms, p(99) < 1000ms
- `http_req_failed`: rate < 0.01 (1%)
- `errors`: rate < 0.01 (1%)

## 📊 Métricas

K6 gera métricas automáticas:
- **VUs (Virtual Users)**: Usuários virtuais simultâneos
- **RPS (Requests Per Second)**: Requisições por segundo
- **Latência**: p50, p90, p95, p99
- **Taxa de erro**: Percentual de requisições falhadas

## 🔧 Personalização

### Alterar carga

Edite `k6-config.json` ou passe parâmetros:
```bash
k6 run load-tests/scripts/load-test.js --vus 200 --duration 10m
```

### Alterar endpoint

Configure no script ou via variável de ambiente:
```bash
API_BASE_URL=https://api.exemplo.com k6 run load-tests/scripts/load-test.js
```

