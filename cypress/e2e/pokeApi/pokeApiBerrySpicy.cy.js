const apiBaseUrl = Cypress.env('pokemonApi');

describe('1.3 api test to get spicy berries', () => {
  it('should be possible to return correct aplication.json', () => {
    cy.request(`${apiBaseUrl}/berry-flavor/spicy`).as('pokemonBerrySpicy');
    cy.get('@pokemonBerrySpicy')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json; charset=utf-8');
  });

  it('should be possible to return status response 200', () => {
    cy.request(`${apiBaseUrl}/berry-flavor/spicy`).as('pokemonBerrySpicy');
    cy.get('@pokemonBerrySpicy').its('status').should('equal', 200);
  });

  it('should be possible to validate content', () => {
    cy.request(`${apiBaseUrl}/berry-flavor/spicy`).as('pokemonBerrySpicy');
    cy.get('@pokemonBerrySpicy').its('body').should('include', { name: 'spicy' });
  });

  it('should be possible to find the berry name with strong potency flavor', () => {
    cy.request(`${apiBaseUrl}/berry-flavor/spicy`).as('pokemonBerrySpicy');

    cy.get('@pokemonBerrySpicy').then((response) => {
      const berryObject = response.body.berries.reduce((a, b) => (a.potency > b.potency ? a : b));

      cy.request(`${apiBaseUrl}/berry/${berryObject.berry.name}`).as('pokemonBerrySpicy');
      cy.get('@pokemonBerrySpicy').its('body').should('include', { name: 'enigma' });
    });
  });
});
