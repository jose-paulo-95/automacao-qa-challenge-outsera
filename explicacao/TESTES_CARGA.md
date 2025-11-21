# 📋 Explicação Detalhada - Testes de Carga

## 🎯 Visão Geral

Os testes de carga foram desenvolvidos utilizando **K6**, uma ferramenta moderna e open-source especializada em performance testing. K6 foi escolhido por sua simplicidade, performance (escrito em Go), e excelente suporte para métricas e relatórios.

## 🏗️ Arquitetura e Estrutura

### Estrutura de Pastas
```
load-tests/
├── scripts/
│   └── load-test.js    # Script principal de teste de carga
└── reports/            # Relatórios gerados (não versionado)
```

### Decisões de Design

1. **K6 como Ferramenta**: Escolhido por ser moderno, performático e ter excelente suporte para métricas customizadas
2. **Script Único com Múltiplos Cenários**: Um script que testa múltiplos endpoints para simular comportamento real de usuário
3. **Métricas Customizadas**: Além das métricas padrão do K6, implementei métricas customizadas para análise detalhada

## 🔧 Componentes Principais

### 1. Configuração de Stages (`options`)

```javascript
export const options = {
  stages: [
    { duration: '1m', target: 100 },   // Ramp-up: 0 a 100 usuários em 1 minuto
    { duration: '3m', target: 500 },   // Ramp-up: 100 a 500 usuários em 3 minutos
    { duration: '5m', target: 500 },   // Estabilizar: 500 usuários por 5 minutos
    { duration: '2m', target: 0 },     // Ramp-down: 500 a 0 usuários em 2 minutos
  ],
  // ...
};
```

**Decisões de Design**:

1. **Ramp-up Gradual**: 
   - Começa com 0 usuários e aumenta gradualmente
   - Evita "thundering herd" (sobrecarga súbita)
   - Permite sistema se adaptar à carga

2. **Fase de Estabilização**:
   - Mantém 500 usuários por 5 minutos
   - Testa comportamento sob carga constante
   - Identifica problemas de memória ou degradação gradual

3. **Ramp-down Gradual**:
   - Reduz carga gradualmente
   - Permite sistema se recuperar
   - Evita quedas súbitas que podem mascarar problemas

**Por que essa abordagem?**
- Simula comportamento real: tráfego não aumenta instantaneamente
- Identifica limites do sistema gradualmente
- Permite análise de performance sob diferentes cargas

### 2. Thresholds (Limites de Aceitação)

```javascript
thresholds: {
  http_req_duration: ['p(95)<500', 'p(99)<1000'],  // 95% < 500ms, 99% < 1000ms
  http_req_failed: ['rate<0.01'],                  // Taxa de erro < 1%
  errors: ['rate<0.01'],                            // Taxa de erro customizada < 1%
},
```

**Decisões de Design**:

1. **Percentis para Tempo de Resposta**:
   - `p(95)<500`: 95% das requisições devem responder em menos de 500ms
   - `p(99)<1000`: 99% das requisições devem responder em menos de 1s
   - Foco em maioria dos usuários (p95) e casos extremos (p99)

2. **Taxa de Erro Baixa**:
   - `rate<0.01`: Menos de 1% de erros
   - Aceitável para APIs RESTful estáveis
   - Pode ser ajustado conforme SLA

**Por que esses valores?**
- 500ms é um tempo de resposta excelente para APIs
- 1% de erro é aceitável sob carga alta
- Percentis são mais úteis que média (não são afetados por outliers)

### 3. Métricas Customizadas

```javascript
const errorRate = new Rate('errors');
const responseTime = new Trend('response_time');
```

**Decisões de Design**:

1. **Rate para Erros**:
   - Rastreia taxa de erros customizada
   - Permite definir o que é considerado "erro" (além de status HTTP)
   - Útil para validações de negócio

2. **Trend para Tempo de Resposta**:
   - Rastreia distribuição de tempos de resposta
   - Permite análise estatística detalhada
   - Útil para identificar padrões

**Por que métricas customizadas?**
- Permite rastrear métricas específicas do negócio
- Facilita análise detalhada de performance
- Complementa métricas padrão do K6

### 4. Função Principal (`default function`)

#### Teste 1: GET /posts
```javascript
const postsResponse = http.get(`${BASE_URL}/posts`);
const postsSuccess = check(postsResponse, {
  'status is 200': (r) => r.status === 200,
  'response time < 500ms': (r) => r.timings.duration < 500,
  'has posts data': (r) => r.json().length > 0,
});
errorRate.add(!postsSuccess);
responseTime.add(postsResponse.timings.duration);
sleep(1);
```

**Decisões de Design**:

1. **Validações Múltiplas**:
   - Status code: Garante que API respondeu corretamente
   - Tempo de resposta: Valida performance
   - Dados: Garante que resposta não está vazia

2. **Registro de Métricas**:
   - `errorRate.add(!postsSuccess)`: Registra erro se qualquer validação falhar
   - `responseTime.add(...)`: Registra tempo de resposta para análise

3. **Sleep entre Requisições**:
   - `sleep(1)`: Simula comportamento humano (usuário não faz requisições instantâneas)
   - Permite sistema processar requisição anterior
   - Reduz chance de sobrecarga artificial

#### Teste 2: GET /users
Similar ao teste de posts, mas focado em endpoint de usuários.

**Decisões de Design**:
- Testa múltiplos endpoints para simular uso real
- Cada endpoint pode ter características diferentes (tamanho de resposta, complexidade)

#### Teste 3: GET /posts/:id
```javascript
const postId = Math.floor(Math.random() * 100) + 1;
const postResponse = http.get(`${BASE_URL}/posts/${postId}`);
```

**Decisões de Design**:

1. **ID Aleatório**:
   - `Math.floor(Math.random() * 100) + 1`: Gera ID entre 1 e 100
   - Simula usuários acessando diferentes recursos
   - Testa cache e performance de busca individual

**Por que IDs aleatórios?**
- Simula comportamento real (usuários não acessam sempre o mesmo recurso)
- Testa eficiência de cache
- Identifica problemas com recursos específicos

#### Teste 4: POST /posts
```javascript
const newPost = {
  title: 'Load Test Post',
  body: 'This is a load test post',
  userId: 1,
};
const createPostResponse = http.post(
  `${BASE_URL}/posts`,
  JSON.stringify(newPost),
  { headers: { 'Content-Type': 'application/json' } }
);
```

**Decisões de Design**:

1. **Criação de Recursos**:
   - Simula usuários criando conteúdo
   - Testa performance de operações de escrita
   - Valida que criação funciona sob carga

2. **Headers Explícitos**:
   - `Content-Type: application/json`: Garante que API entende requisição
   - Boa prática para APIs RESTful

3. **Sleep Maior**:
   - `sleep(2)`: Operações de escrita geralmente levam mais tempo
   - Simula comportamento humano (usuário lê resposta antes de próxima ação)

### 5. Funções de Setup e Teardown

```javascript
export function setup() {
  console.log('Iniciando teste de carga...');
  console.log(`Base URL: ${BASE_URL}`);
  return { startTime: new Date() };
}

export function teardown(data) {
  console.log('Teste de carga finalizado');
  console.log(`Tempo total: ${new Date() - data.startTime}ms`);
}
```

**Decisões de Design**:

1. **Setup**:
   - Loga informações iniciais
   - Retorna dados para uso no teste
   - Útil para inicialização (ex: autenticação, criação de dados)

2. **Teardown**:
   - Loga informações finais
   - Calcula tempo total de execução
   - Útil para limpeza (ex: remover dados de teste)

**Por que essas funções?**
- Permitem preparação e limpeza antes/depois do teste
- Úteis para testes que requerem estado inicial
- Facilitam análise de tempo total

## 📊 Análise de Performance

### Métricas Coletadas

1. **Tempo de Resposta**:
   - Média, mediana, percentis (p95, p99)
   - Identifica latência e gargalos

2. **Taxa de Erro**:
   - Percentual de requisições que falharam
   - Identifica problemas de estabilidade

3. **Throughput**:
   - Requisições por segundo (RPS)
   - Identifica capacidade do sistema

4. **VUs (Virtual Users)**:
   - Número de usuários simultâneos
   - Identifica comportamento sob diferentes cargas

### Interpretação de Resultados

**Cenário Ideal**:
- ✅ p95 < 500ms (maioria das requisições rápidas)
- ✅ p99 < 1000ms (casos extremos aceitáveis)
- ✅ Taxa de erro < 1%
- ✅ Throughput estável durante fase de estabilização

**Problemas Identificáveis**:
- ⚠️ Tempo de resposta aumentando gradualmente → Possível vazamento de memória
- ⚠️ Taxa de erro alta → Sistema sobrecarregado
- ⚠️ Throughput diminuindo → Gargalo de recursos
- ⚠️ Erros súbitos → Problema de infraestrutura ou código

## 🎓 Conceitos Demonstrados

### 1. **Load Testing**
- Testa sistema sob carga esperada
- Identifica limites e gargalos
- Valida que sistema suporta carga de produção

### 2. **Ramp-up Gradual**
- Aumenta carga gradualmente
- Evita sobrecarga súbita
- Simula comportamento real

### 3. **Métricas Estatísticas**
- Percentis (p95, p99) são mais úteis que média
- Não são afetados por outliers
- Representam experiência da maioria dos usuários

### 4. **Validação de Performance**
- Não apenas "funciona", mas "funciona bem"
- Thresholds definem critérios de aceitação
- Testes falham se performance não atender SLA

### 5. **Simulação Realista**
- Múltiplos endpoints testados
- Sleep entre requisições
- IDs aleatórios para variabilidade

## 🚀 Pontos Fortes da Implementação

1. **Configuração Realista**: Stages simulam comportamento real de tráfego
2. **Métricas Abrangentes**: Cobre tempo de resposta, taxa de erro e throughput
3. **Validações Múltiplas**: Verifica status, performance e dados
4. **Métricas Customizadas**: Permite análise detalhada
5. **Flexibilidade**: Base URL configurável via environment variable
6. **Documentação**: Código bem comentado e estruturado

## 💡 Melhorias Futuras (Para Discussão em Entrevista)

1. **Stress Testing**: Testar além da carga esperada para identificar breaking point
2. **Spike Testing**: Testar aumentos súbitos de carga
3. **Soak Testing**: Testar por períodos longos para identificar vazamentos de memória
4. **Volume Testing**: Testar com grandes volumes de dados
5. **Integração com CI/CD**: Executar testes de carga automaticamente
6. **Relatórios Visuais**: Integração com Grafana ou similar para dashboards
7. **Testes de Autenticação**: Incluir endpoints protegidos com JWT
8. **Testes de Banco de Dados**: Validar performance de queries sob carga

## 📝 Como Explicar em Entrevista

### Estrutura da Apresentação

1. **Contexto**: "Implementei testes de carga usando K6 para validar performance e capacidade da API sob diferentes níveis de carga"

2. **Configuração**: "Configurei stages de ramp-up gradual (0→100→500 usuários), fase de estabilização (500 usuários por 5 minutos) e ramp-down gradual para simular comportamento real de tráfego"

3. **Métricas**: "Defini thresholds de performance (p95 < 500ms, p99 < 1000ms) e taxa de erro (< 1%), além de métricas customizadas para análise detalhada"

4. **Cenários**: "Testei múltiplos endpoints (GET /posts, GET /users, POST /posts) com validações de status, tempo de resposta e dados, simulando comportamento real de usuários"

5. **Resultados**: "Os testes identificam gargalos de performance, problemas de estabilidade e limites do sistema, garantindo que a API suporte carga de produção"

### Perguntas Frequentes e Respostas

**Q: Por que K6 e não outras ferramentas (JMeter, Gatling)?**
A: K6 é moderno, performático (escrito em Go), tem excelente suporte para métricas customizadas e scripts em JavaScript são mais fáceis de manter. Além disso, tem ótima integração com CI/CD.

**Q: Como você define os thresholds?**
A: Baseado em SLA do negócio. Para APIs RESTful, 500ms é um tempo de resposta excelente. Percentis (p95, p99) são mais úteis que média pois representam experiência da maioria dos usuários.

**Q: Por que ramp-up gradual?**
A: Simula comportamento real (tráfego não aumenta instantaneamente) e permite sistema se adaptar à carga. Ramp-up súbito pode mascarar problemas ou causar falhas prematuras.

**Q: Como você identifica gargalos?**
A: Analisando métricas: tempo de resposta aumentando indica gargalo de CPU/memória, taxa de erro alta indica sobrecarga, throughput diminuindo indica limite de recursos.

**Q: Você testa apenas APIs ou também frontend?**
A: Foco em APIs pois são o gargalo comum. Frontend pode ser testado com ferramentas como Lighthouse, mas APIs são críticas para performance geral.

**Q: Como você integra com CI/CD?**
A: K6 pode ser executado em pipelines CI/CD. Em produção, executaria testes de carga após deploy para validar que performance não degradou.

**Q: Você testa diferentes tipos de carga?**
A: Atualmente foco em load testing (carga esperada). Em produção, adicionaria stress testing (além da carga esperada) e soak testing (períodos longos) para identificar vazamentos de memória.

