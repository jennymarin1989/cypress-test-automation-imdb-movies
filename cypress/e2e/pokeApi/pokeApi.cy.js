describe('1.1 REST api with cypress ', () => {
  // beforeEach(() => {

  // })

  it('should be possible to return correct aplication.json', () => {
    cy.request('https://pokeapi.co/api/v2/berry/2').as('pokemonBerry');
    cy.get('@pokemonBerry')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json; charset=utf-8');
  });

  it('should be possible to return status response 200', () => {
    cy.request('https://pokeapi.co/api/v2/berry/2').as('pokemonBerry');
    cy.get('@pokemonBerry').its('status').should('equal', 200);
  });

  it('should be possible to validate content', () => {
    cy.request('https://pokeapi.co/api/v2/berry/2').as('pokemonBerry');
    cy.get('@pokemonBerry').its('body').should('include', { id: 2 });
  });

  it('should be possible to return an error', () => {
    cy.request({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/berry/500',
      failOnStatusCode: false
    }).as('pokemonBerry');
    cy.get('@pokemonBerry').its('status').should('equal', 404);
  });
});

context('1.2 REST api with cypress ', () => {
  // beforeEach(() => {

  // })

  it('should be possible to return correct aplication.json', () => {
    cy.request('https://pokeapi.co/api/v2/berry/cheri').as('pokemonBerry');
    cy.get('@pokemonBerry')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json; charset=utf-8');
  });

  it('should be possible to return status response 200', () => {
    cy.request('https://pokeapi.co/api/v2/berry/cheri').as('pokemonBerry');
    cy.get('@pokemonBerry').its('status').should('equal', 200);
  });

  it('should be possible to validate content', () => {
    cy.request('https://pokeapi.co/api/v2/berry/cheri').as('pokemonBerry');
    cy.get('@pokemonBerry').its('body').should('include', { name: 'cheri' });
  });

  it('should be possible to return an error', () => {
    cy.request({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/berry/cheriss',
      failOnStatusCode: false
    }).as('pokemonBerry');
    cy.get('@pokemonBerry').its('status').should('equal', 404);
  });
});
