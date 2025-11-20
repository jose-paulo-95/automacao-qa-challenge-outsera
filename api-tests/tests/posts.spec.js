/// <reference types="cypress" />

describe('API Tests - Posts Endpoint', () => {
  const baseUrl = Cypress.env('apiBaseUrl');

  describe('GET /posts', () => {
    it('Deve retornar lista de posts com status 200', () => {
      cy.api({
        method: 'GET',
        url: `${baseUrl}/posts`,
      })
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an('array');
          expect(response.body.length).to.be.greaterThan(0);
          
          // Validar estrutura do primeiro post
          const post = response.body[0];
          expect(post).to.have.property('id');
          expect(post).to.have.property('title');
          expect(post).to.have.property('body');
          expect(post).to.have.property('userId');
        });
    });

    it('Deve retornar post específico por ID', () => {
      const postId = 1;
      cy.api({
        method: 'GET',
        url: `${baseUrl}/posts/${postId}`,
      })
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.id).to.eq(postId);
        });
    });

    it('Deve filtrar posts por userId', () => {
      const userId = 1;
      cy.api({
        method: 'GET',
        url: `${baseUrl}/posts`,
        qs: { userId: userId },
      })
        .then((response) => {
          expect(response.status).to.eq(200);
          response.body.forEach(post => {
            expect(post.userId).to.eq(userId);
          });
        });
    });
  });

  describe('POST /posts', () => {
    it('Deve criar novo post com status 201', () => {
      cy.fixture('posts').then((posts) => {
        cy.api({
          method: 'POST',
          url: `${baseUrl}/posts`,
          body: posts.newPost,
        })
          .then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
            expect(response.body.title).to.eq(posts.newPost.title);
            expect(response.body.body).to.eq(posts.newPost.body);
            expect(response.body.userId).to.eq(posts.newPost.userId);
          });
      });
    });
  });

  describe('PUT /posts/:id', () => {
    it('Deve atualizar post existente', () => {
      const postId = 1;
      cy.fixture('posts').then((posts) => {
        cy.api({
          method: 'PUT',
          url: `${baseUrl}/posts/${postId}`,
          body: posts.updatePost,
        })
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.title).to.eq(posts.updatePost.title);
            expect(response.body.body).to.eq(posts.updatePost.body);
          });
      });
    });
  });

  describe('DELETE /posts/:id', () => {
    it('Deve deletar post com sucesso', () => {
      const postId = 1;
      cy.api({
        method: 'DELETE',
        url: `${baseUrl}/posts/${postId}`,
      })
        .then((response) => {
          expect(response.status).to.eq(200);
        });
    });
  });

  describe('Cenários Negativos', () => {
    it('Deve retornar 404 para post inexistente', () => {
      const invalidPostId = 99999;
      cy.api({
        method: 'GET',
        url: `${baseUrl}/posts/${invalidPostId}`,
        failOnStatusCode: false,
      })
        .then((response) => {
          expect(response.status).to.eq(404);
        });
    });

    it('Deve validar timeout em requisição lenta', () => {
      cy.api({
        method: 'GET',
        url: `${baseUrl}/posts`,
        timeout: 5000,
      })
        .then((response) => {
          expect(response.status).to.be.oneOf([200, 408]);
        });
    });
  });
});

