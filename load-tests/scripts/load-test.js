import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Métricas customizadas
const errorRate = new Rate('errors');
const responseTime = new Trend('response_time');

// Configuração do teste
export const options = {
  stages: [
    { duration: '1m', target: 100 },  // Ramp-up: 0 a 100 usuários em 1 minuto
    { duration: '3m', target: 500 },  // Ramp-up: 100 a 500 usuários em 3 minutos
    { duration: '5m', target: 500 },  // Estabilizar: 500 usuários por 5 minutos
    { duration: '2m', target: 0 },     // Ramp-down: 500 a 0 usuários em 2 minutos
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'], // 95% das requisições < 500ms, 99% < 1000ms
    http_req_failed: ['rate<0.01'], // Taxa de erro < 1%
    errors: ['rate<0.01'],
  },
};

const BASE_URL = __ENV.API_BASE_URL || 'https://jsonplaceholder.typicode.com';

// Função para simular usuário
export default function () {
  // Teste 1: GET /posts
  const postsResponse = http.get(`${BASE_URL}/posts`);
  const postsSuccess = check(postsResponse, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
    'has posts data': (r) => r.json().length > 0,
  });
  errorRate.add(!postsSuccess);
  responseTime.add(postsResponse.timings.duration);
  sleep(1);

  // Teste 2: GET /users
  const usersResponse = http.get(`${BASE_URL}/users`);
  const usersSuccess = check(usersResponse, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
    'has users data': (r) => r.json().length > 0,
  });
  errorRate.add(!usersSuccess);
  responseTime.add(usersResponse.timings.duration);
  sleep(1);

  // Teste 3: GET /posts/:id
  const postId = Math.floor(Math.random() * 100) + 1;
  const postResponse = http.get(`${BASE_URL}/posts/${postId}`);
  const postSuccess = check(postResponse, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
    'has post id': (r) => r.json().id === postId,
  });
  errorRate.add(!postSuccess);
  responseTime.add(postResponse.timings.duration);
  sleep(1);

  // Teste 4: POST /posts (criar novo post)
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
  const createPostSuccess = check(createPostResponse, {
    'status is 201': (r) => r.status === 201,
    'response time < 1000ms': (r) => r.timings.duration < 1000,
    'post created': (r) => r.json().id !== undefined,
  });
  errorRate.add(!createPostSuccess);
  responseTime.add(createPostResponse.timings.duration);
  sleep(2);
}

// Função executada antes do teste
export function setup() {
  console.log('Iniciando teste de carga...');
  console.log(`Base URL: ${BASE_URL}`);
  return { startTime: new Date() };
}

// Função executada após o teste
export function teardown(data) {
  console.log('Teste de carga finalizado');
  console.log(`Tempo total: ${new Date() - data.startTime}ms`);
}

