const apiBaseUrl = Cypress.env('pokemonApi');

describe('Req_id 2.3, verify that an api can filter a spicy berry by it’s potency and find the berry name details', () => {
  it('TC_009, should be possible to return correct aplication.json', () => {
    cy.request(`${apiBaseUrl}/berry-flavor/spicy`).as('pokemonBerrySpicy');
    cy.get('@pokemonBerrySpicy')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json; charset=utf-8');
  });

  it('TC_pokeApi_010, should be possible to return status response 200', () => {
    cy.request(`${apiBaseUrl}/berry-flavor/spicy`).as('pokemonBerrySpicy');
    cy.get('@pokemonBerrySpicy').its('status').should('equal', 200);
  });

  it('TC_pokeApi_011, should be possible to validate content', () => {
    cy.request(`${apiBaseUrl}/berry-flavor/spicy`).as('pokemonBerrySpicy');
    cy.get('@pokemonBerrySpicy').its('body').should('include', { name: 'spicy' });
  });

  it('TC_pokeApi_012, should be possible to find the berry name with strong potency flavor, check the status response and valid content', () => {
    cy.request(`${apiBaseUrl}/berry-flavor/spicy`).as('pokemonBerrySpicy');

    cy.get('@pokemonBerrySpicy').then((response) => {
      const berryObject = response.body.berries.reduce((a, b) => (a.potency > b.potency ? a : b));

      cy.request(`${apiBaseUrl}/berry/${berryObject.berry.name}`).as('pokemonBerrySpicy');
      cy.get('@pokemonBerrySpicy').its('status').should('equal', 200);
      cy.get('@pokemonBerrySpicy').its('body').should('include', { name: 'enigma' });
    });
  });
});
