import { commonElements } from '../commons/commonElements';

describe('Req_id 1.2, Verify rating a movie from the Top Box Office list by giving stars ', () => {
  const topBoxTitleElement = ' [data-testid="chart-layout-sidebar-title-container"]';
  const topBoxMoviesContainer = '[data-testid="chart-layout-main-column"]';
  const rateButtonElement = '[data-testid="rate-button"]';

  beforeEach(() => {
    commonElements.testInitialSetUp();
    cy.fixture('movies').as('moviesRateData');
  });

  it('TC_movie_003, should be possible to rate a movie by giving 5 stars', () => {
    //check the correct page url when loading
    cy.get('@moviesRateData').then((moviesRateData) => {
      cy.url().should('contain', '/');

      //click on menu and select Movies - Top Box office
      commonElements.clickOnMenuButton('Open Navigation Drawer');
      commonElements.selectMenuOption(
        moviesRateData.titleMovies,
        moviesRateData.officeTopBox,
        'nav-link-categories-mov',
        '/chart/boxoffice/?ref_=nv_ch_cht'
      );

      //check that page is correct and title
      commonElements.findElementAndCheckDisplay(
        topBoxTitleElement,
        'h1',
        moviesRateData.usOfficeTopBox
      );

      //check container with list of movies is visible and click on rate second movie
      cy.get(topBoxMoviesContainer)
        .should('be.visible')
        .within(() => {
          cy.get('.ipc-metadata-list .ipc-metadata-list-summary-item')
            .eq(moviesRateData.movieToRate)
            .find(rateButtonElement)
            .should('be.enabled')
            .click();
        });

      //check modal rate container, initial values and set 5 stars, check value in star icon
      cy.get('.ipc-promptable-base__content .ipc-rating-prompt__star-display ')
        .should('be.visible')
        .and('contain', '?')
        .next()
        .find('.ipc-starbar__rating__button')
        .should('have.length', 10)
        .filter(`:lt(${moviesRateData.starsToSelect})`)
        .each((elem, i) => {
          cy.get(elem).trigger('mouseover', { force: true }).click({ force: true });
          cy.get('.ipc-rating-prompt__star-display')
            .should('be.visible')
            .and('contain', i + 1);
        });

      //click on rate button
      cy.get('.ipc-rating-prompt__rating-container  .ipc-btn').click();

      //check sign in redirection
      cy.url().should('contain', '/registration/signin');
      cy.get('div[id="signin-options"]').should('be.visible');
    });
  });

  it('TC_movie_004, should not be possible to rate a movie if no stars are giving', () => {
    cy.get('@moviesRateData').then((moviesRateData) => {
      cy.url().should('contain', '/');

      // click on menu and select Movies - Top Box office
      commonElements.clickOnMenuButton('Open Navigation Drawer');
      commonElements.selectMenuOption(
        moviesRateData.titleMovies,
        moviesRateData.officeTopBox,
        'nav-link-categories-mov',
        '/chart/boxoffice/?ref_=nv_ch_cht'
      );

      //check that page is correct and title
      commonElements.findElementAndCheckDisplay(
        topBoxTitleElement,
        'h1',
        moviesRateData.usOfficeTopBox
      );

      //check container with list of movies is visible and click on rate second movie
      cy.get(topBoxMoviesContainer)
        .should('be.visible')
        .within(() => {
          cy.get('.ipc-metadata-list .ipc-metadata-list-summary-item')
            .eq(moviesRateData.movieToRate)
            .find(rateButtonElement)
            .should('be.enabled')
            .click();
        });

      //check rating modal container and try clicking on rate button without giving any stars
      cy.get('.ipc-promptable-base__content .ipc-rating-prompt__star-display ')
        .should('be.visible')
        .and('contain', '?')
        .next()
        .find('.ipc-rating-prompt__rating-container  .ipc-btn')
        .should('have.attr', 'aria-disabled', 'true');
    });
  });
});
