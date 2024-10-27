import { commonElements, searchInput } from '../commons/commonElements';

describe('IMDB Req_id 1.1, verify actor name search functionality and access to the upcoming films', () => {
  const actorElementDisplay = '[data-testid="hero__pageTitle"]';
  const actorListItem = 'div [role="listbox"]';
  const titleID = '[data-testid="hero__primary-text"]';
  const upcomingElement = '[data-testid="accordion-item-actor-upcoming-projects"]';
  const upcomingItemList = '[data-testid="accordion-item-content-container"]';
  const signInModalElement = 'div[id="logged-out-modal-v2"]';
  const advanceSearchSection = '[data-testid="advanced-search-section"]';

  beforeEach(() => {
    commonElements.testInitialSetUp();
    cy.fixture('movies').as('moviesDataActorSearch');
  });

  it("TC_001, should search with valid actor's name and access the upcoming films", () => {
    cy.get('@moviesDataActorSearch').then((moviesDataActorSearch) => {
      //check the correct page url when loading
      cy.url().should('contain', '/');

      //search for valid name
      commonElements.setInputToSearch(moviesDataActorSearch.movieActor);
      cy.get(actorListItem).contains(moviesDataActorSearch.movieActor).click();

      //check actor's name search results
      cy.get(`${actorElementDisplay} span`).should('have.text', moviesDataActorSearch.movieActor);
      commonElements.checkTitleDisplay(titleID, moviesDataActorSearch.movieActor);

      //click on upcoming elements and click on first movie with tag completed
      cy.get(upcomingElement).scrollIntoView().click({ force: true });
      cy.get(`${upcomingItemList} ul`)
        .contains('li')
        .parent()
        .within(() => {
          cy.get('li').find('a').should('have.text', moviesDataActorSearch.movieTag).click();
        });

      //should get redirected to sign in
      cy.get(`${signInModalElement} a`)
        .should(
          'have.attr',
          'href',
          'https://pro.imdb.com/signup/pro/start?rf=cons_nm_filmo&ref_=tt_pub_upslb_signup'
        )
        .and('contain', moviesDataActorSearch.tryPremium);
    });
  });

  it('TC_002, should search with empty value', () => {
    cy.get('@moviesDataActorSearch').then((moviesDataEmptySearch) => {
      //search for valid name
      cy.get(searchInput).type('  {enter}');
      commonElements.findElementAndCheckDisplay(
        advanceSearchSection,
        'h3',
        moviesDataEmptySearch.searchAdvance
      );
    });
  });
});
