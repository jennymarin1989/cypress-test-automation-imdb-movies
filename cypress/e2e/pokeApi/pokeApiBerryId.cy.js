const apiBaseUrl = Cypress.env('pokemonApi');

describe('1.1 api test to get berries by id ', () => {
  it('should be possible to return correct aplication.json', () => {
    cy.request(`${apiBaseUrl}/berry/2`).as('pokemonBerryName');
    cy.get('@pokemonBerryName')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json; charset=utf-8');
  });

  it('should be possible to return status response 200', () => {
    cy.request(`${apiBaseUrl}/berry/2`).as('pokemonBerryName');
    cy.get('@pokemonBerryName').its('status').should('equal', 200);
  });

  it('should be possible to validate content', () => {
    cy.request(`${apiBaseUrl}/berry/2`).as('pokemonBerryName');
    cy.get('@pokemonBerryName').its('body').should('include', { id: 2 });
  });

  it('should be possible to return an error', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/berry/500`,
      failOnStatusCode: false
    }).as('pokemonBerryName');
    cy.get('@pokemonBerryName').its('status').should('equal', 404);
  });
});
