import { commonElements } from '../commons/commonElements';

describe('IMDB Req_id 1.1, Access to actor profile by search and select a completed movie', () => {
  // crear data test en fixtures
  const navElementDisplay = 'nav[id="imdbHeader"]';
  const actorElementDisplay = '[data-testid="hero__pageTitle"]';
  const actorListItem = 'div [role="listbox"]';
  const titleID = '[data-testid="hero__primary-text"]';
  const upcomingElement = '[data-testid="accordion-item-actor-upcoming-projects"]';
  const upcomingItemList = '[data-testid="accordion-item-content-container"]';
  const signInModalElement = 'div[id="logged-out-modal-v2"]';

  beforeEach(() => {
    cy.visit('');
    cy.viewport('macbook-16');
    commonElements.checkContainerDisplay(navElementDisplay);
    cy.get('[data-testid="accept-button"]').click({ force: true });
    cy.fixture('movies').as('moviesDataActorSearch');
  });

  it("should be possible to access the actor's profile by entering name on searchbox", () => {
    cy.get('@moviesDataActorSearch').then((moviesDataActorSearch) => {
      //check the correct page url when loading
      cy.url().should('contain', '/');

      //search for name
      commonElements.setInputToSearch(moviesDataActorSearch.movieActor);
      cy.get(actorListItem).contains(moviesDataActorSearch.movieActor).click();

      // add asertion to check that not results found for empty value or not found

      //check actor's name search results
      cy.get(actorElementDisplay)
        .find('span')
        .should('have.text', moviesDataActorSearch.movieActor);
      commonElements.checkTitleDisplay(titleID, moviesDataActorSearch.movieActor);

      // click on upcoming elements and click on first movie with tag completed
      cy.get(upcomingElement).scrollIntoView().click({ force: true });
      cy.get(upcomingItemList).find('ul').should('be.visible');
      cy.get(upcomingItemList)
        .find('ul')
        .contains('li')
        .parent()
        .within(() => {
          cy.get('li').find('a').should('have.text', moviesDataActorSearch.movieTag).click();
        });

      //should get redirected to sign in
      cy.get(signInModalElement)
        .find('a')
        .should(
          'have.attr',
          'href',
          'https://pro.imdb.com/signup/pro/start?rf=cons_nm_filmo&ref_=tt_pub_upslb_signup'
        )
        .and('contain', moviesDataActorSearch.tryPremium);
    });
  });
});
