import { commonElements } from '../commons/commonElements';

describe('IMDB Req_id 1.2, ', () => {
  // crear data test en fixtures

  const navElementDisplay = 'nav[id="imdbHeader"]';
  const topBoxTitleElement = ' [data-testid="chart-layout-sidebar-title-container"]';
  const topBoxMoviesContainer = '[data-testid="chart-layout-main-column"]';
  const rateButtonElement = '[data-testid="rate-button"]';
  const movieToRate = 1;
  const starsToRate = 5;

  beforeEach(() => {
    cy.visit('');
    cy.viewport('macbook-16');
    commonElements.checkContainerDisplay(navElementDisplay);
    cy.get('[data-testid="accept-button"]').click({ force: true });
  });

  it('should be possible to rate a movie', () => {
    //check the correct page url when loading
    cy.url().should('contain', '/');

    // click on menu and select Movies - Top Box office
    commonElements.clickOnMenuButton('Open Navigation Drawer');
    commonElements.selectMenuOption(
      'Movies',
      'Top Box Office',
      'nav-link-categories-mov',
      '/chart/boxoffice/?ref_=nv_ch_cht'
    );

    //check that page is correct and title
    commonElements.findElementAndCheckDisplay(topBoxTitleElement, 'h1', 'Top Box Office (US)');

    // check container with list of movies is visible and click on rate second movie
    cy.get(topBoxMoviesContainer)
      .should('be.visible')
      .within(() => {
        cy.get('.ipc-metadata-list')
          .find('.ipc-metadata-list-summary-item')
          .eq(movieToRate)
          .find(rateButtonElement)
          .should('be.enabled')
          .click();
      });

    // Check star image and initial value   -- check unhandle promise error each()
    cy.get('.ipc-promptable-base__content')
      .find('.ipc-rating-prompt__star-display ')
      .should('be.visible')
      .and('contain', '?')
      .next()
      .find('.ipc-starbar__rating__button')
      .should('have.length', 10)
      .filter(`:lt(${starsToRate})`)
      .each((elem, i) => {
        cy.get(elem).trigger('mouseover', { force: true }).click({ force: true });
        cy.get('.ipc-rating-prompt__star-display')
          .should('be.visible')
          .and('contain', i + 1);
      });

    // click on rate button
    cy.get('.ipc-rating-prompt__rating-container  .ipc-btn').click();

    // check sign in redirection
    cy.url().should('contain', '/registration/signin');
    cy.get('div[id="signin-options"]').should('be.visible');
  });
});
