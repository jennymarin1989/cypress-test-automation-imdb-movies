const apiBaseUrl = Cypress.env('pokemonApi');

describe('pokeApi 2.2, verify that an api access the info of a specific berry by providing the name to the api', () => {
  it('TC_004, should be possible to return correct aplication.json', () => {
    cy.request(`${apiBaseUrl}/berry/cheri`).as('pokemonBerryName');
    cy.get('@pokemonBerryName')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json; charset=utf-8');
  });

  it('TC_005, should be possible to return status response 200', () => {
    cy.request(`${apiBaseUrl}/berry/cheri`).as('pokemonBerryName');
    cy.get('@pokemonBerryName').its('status').should('equal', 200);
  });

  it('TC_006, should be possible to validate content', () => {
    cy.request(`${apiBaseUrl}/berry/cheri`).as('pokemonBerryName');
    cy.get('@pokemonBerryName').its('body').should('include', { name: 'cheri' });
  });

  it('TC_007, should be possible to return an error', () => {
    cy.request({
      method: 'GET',
      url: `${apiBaseUrl}/berry/cheri123`,
      failOnStatusCode: false
    }).as('pokemonBerryName');
    cy.get('@pokemonBerryName').its('status').should('equal', 404);
  });
});
