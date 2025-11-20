// ***********************************************
// Este arquivo contém comandos customizados do Cypress
// ***********************************************

/**
 * Comando customizado para fazer requisições API com tratamento de erros
 * @param {string} method - Método HTTP (GET, POST, PUT, DELETE)
 * @param {string} endpoint - Endpoint da API
 * @param {object} body - Corpo da requisição (opcional)
 * @param {object} headers - Headers customizados (opcional)
 */
Cypress.Commands.add(
  "apiRequest",
  (method, endpoint, body = null, headers = {}) => {
    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const options = {
      method,
      url: endpoint,
      headers: defaultHeaders,
      failOnStatusCode: false,
    };

    if (body) {
      options.body = body;
    }

    return cy.request(options);
  }
);

/**
 * Comando para validar estrutura de resposta JSON
 * @param {object} obj - Objeto a ser validado (pode ser response.body ou objeto direto)
 * @param {object} schema - Schema esperado
 */
Cypress.Commands.add("validateJsonSchema", (obj, schema) => {
  // Se o objeto passado for uma resposta do Cypress, extrair o body
  const dataToValidate = obj && obj.body ? obj.body : obj;

  // Verificar se o objeto existe e não é nulo
  if (!dataToValidate) {
    throw new Error("Objeto para validação não pode ser null ou undefined");
  }

  if (typeof dataToValidate !== "object" || Array.isArray(dataToValidate)) {
    throw new Error("Objeto para validação deve ser um objeto (não array)");
  }

  const validateField = (data, schemaObj, path = "") => {
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      throw new Error(`Campo ${path || "raiz"} deve ser um objeto`);
    }

    Object.keys(schemaObj).forEach((key) => {
      const fullPath = path ? `${path}.${key}` : key;

      // Verificar se a propriedade existe
      expect(data, `Campo ${fullPath} deve existir`).to.have.property(key);

      // Se o valor do schema for um objeto (não array, não null), validar recursivamente
      if (
        typeof schemaObj[key] === "object" &&
        !Array.isArray(schemaObj[key]) &&
        schemaObj[key] !== null &&
        data[key] !== null &&
        data[key] !== undefined &&
        typeof data[key] === "object" &&
        !Array.isArray(data[key])
      ) {
        validateField(data[key], schemaObj[key], fullPath);
      }
    });
  };

  validateField(dataToValidate, schema);
});

/**
 * Comando para validar status code
 * @param {number} statusCode - Status code esperado
 */
Cypress.Commands.add("shouldHaveStatus", (statusCode) => {
  cy.then((response) => {
    expect(response.status).to.eq(statusCode);
  });
});
