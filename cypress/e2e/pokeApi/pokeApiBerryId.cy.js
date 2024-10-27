const apiBaseUrl = Cypress.env('pokemonApi');

describe('pokeApi 2.1, verify that user can access the info of a specific berry by providing the :id to the api', () => {
  it('TC_001, should be possible to return correct aplication.json', () => {
    cy.request(`${apiBaseUrl}/berry/2`).as('pokemonBerryId');
    cy.get('@pokemonBerryId')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json; charset=utf-8');
  });

  it('TC_002, should be possible to return status response 200', () => {
    cy.request(`${apiBaseUrl}/berry/2`).as('pokemonBerryId');
    cy.get('@pokemonBerryId').its('status').should('equal', 200);
  });

  it('TC_003, should be possible to validate content', () => {
    cy.request(`${apiBaseUrl}/berry/2`).as('pokemonBerryId');
    cy.get('@pokemonBerryId').its('body').should('include', { id: 2 });
  });

  it('TC_004, should be possible to return an error', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/berry/500`,
      failOnStatusCode: false
    }).as('pokemonBerryId');
    cy.get('@pokemonBerryId').its('status').should('equal', 404);
  });
});
