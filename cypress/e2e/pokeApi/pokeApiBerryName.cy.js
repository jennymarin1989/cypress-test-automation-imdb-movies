const apiBaseUrl = Cypress.env('pokemonApi');

describe('1.2 api test to get berries by name', () => {
  it('should be possible to return correct aplication.json', () => {
    cy.request(`${apiBaseUrl}/berry/cheri`).as('pokemonBerryId');
    cy.get('@pokemonBerryId')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json; charset=utf-8');
  });

  it('should be possible to return status response 200', () => {
    cy.request(`${apiBaseUrl}/berry/cheri`).as('pokemonBerryId');
    cy.get('@pokemonBerryId').its('status').should('equal', 200);
  });

  it('should be possible to validate content', () => {
    cy.request(`${apiBaseUrl}/berry/cheri`).as('pokemonBerryId');
    cy.get('@pokemonBerryId').its('body').should('include', { name: 'cheri' });
  });

  it('should be possible to return an error', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/berry/cheri123`,
      failOnStatusCode: false
    }).as('pokemonBerryId');
    cy.get('@pokemonBerryId').its('status').should('equal', 404);
  });
});
