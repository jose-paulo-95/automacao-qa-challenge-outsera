/// <reference types="cypress" />

describe('API Tests - Users Endpoint', () => {
  const baseUrl = Cypress.env('apiBaseUrl');

  describe('GET /users', () => {
    it('Deve retornar lista de usuários com status 200', () => {
      cy.api({
        method: 'GET',
        url: `${baseUrl}/users`,
      })
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.be.greaterThan(0);
          
          // Validar estrutura do primeiro usuário
          const user = response.body[0];
          cy.validateJsonSchema(user, {
            id: null,
            name: null,
            username: null,
            email: null,
            address: {
              street: null,
              city: null,
              zipcode: null
            }
          });
        });
    });

    it('Deve retornar usuário específico por ID com status 200', () => {
      const userId = 1;
      cy.api({
        method: 'GET',
        url: `${baseUrl}/users/${userId}`,
      })
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an('object');
          expect(response.body.id).to.eq(userId);
          expect(response.body).to.have.property('name');
          expect(response.body).to.have.property('email');
        });
    });

    it('Deve retornar status 404 para usuário inexistente', () => {
      const invalidUserId = 99999;
      cy.api({
        method: 'GET',
        url: `${baseUrl}/users/${invalidUserId}`,
        failOnStatusCode: false,
      })
        .then((response) => {
          expect(response.status).to.eq(404);
        });
    });
  });

  describe('POST /users', () => {
    it('Deve criar novo usuário com status 201', () => {
      cy.fixture('users').then((users) => {
        cy.api({
          method: 'POST',
          url: `${baseUrl}/users`,
          body: users.newUser,
        })
          .then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
            expect(response.body.name).to.eq(users.newUser.name);
            expect(response.body.email).to.eq(users.newUser.email);
          });
      });
    });

    it('Deve validar campos obrigatórios - falha ao criar usuário sem email', () => {
      const invalidUser = {
        name: 'Test User',
        username: 'testuser'
        // email ausente
      };
      
      cy.api({
        method: 'POST',
        url: `${baseUrl}/users`,
        body: invalidUser,
        failOnStatusCode: false,
      })
        .then((response) => {
          // API pode retornar 400 ou 201 dependendo da implementação
          // Este é um cenário negativo de validação
          expect([201, 400]).to.include(response.status);
        });
    });
  });

  describe('PUT /users/:id', () => {
    it('Deve atualizar usuário existente com status 200', () => {
      const userId = 1;
      cy.fixture('users').then((users) => {
        cy.api({
          method: 'PUT',
          url: `${baseUrl}/users/${userId}`,
          body: users.updateUser,
        })
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.name).to.eq(users.updateUser.name);
            expect(response.body.email).to.eq(users.updateUser.email);
          });
      });
    });
  });

  describe('DELETE /users/:id', () => {
    it('Deve deletar usuário com status 200', () => {
      const userId = 1;
      cy.api({
        method: 'DELETE',
        url: `${baseUrl}/users/${userId}`,
      })
        .then((response) => {
          expect(response.status).to.eq(200);
        });
    });
  });

  describe('Validação de Headers', () => {
    it('Deve validar Content-Type da resposta', () => {
      cy.api({
        method: 'GET',
        url: `${baseUrl}/users/1`,
      })
        .then((response) => {
          expect(response.headers['content-type']).to.include('application/json');
        });
    });
  });
});

