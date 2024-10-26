import { commonElements } from '../commons/commonElements';

describe('IMDB Req_id 1.3, ', () => {
  const tvShowTitleElement = '[data-testid="chart-layout-sidebar-title-container"]';
  const tvShowContainer = '[data-testid="chart-layout-main-column"]';
  const movieTitleElement = '[data-testid="hero__pageTitle"]';
  const actionBar = '[data-testid="action-bar"]';
  const imageFilterContainer = '[data-testid="image-names-filter-container-test-id"]';

  beforeEach(() => {
    commonElements.testInitialSetUp();
    cy.fixture('movies').as('moviesDatafilter');
  });

  it('should be possible to filter photos by person in movie filter', () => {
    cy.get('@moviesDatafilter').then((moviesDatafilter) => {
      // check container display
      commonElements.clickOnMenuButton('Open Navigation Drawer');
      commonElements.selectMenuOption(
        moviesDatafilter.titleTvShows,
        moviesDatafilter.optionTvShows,
        'nav-link-categories-tvshows',
        '/chart/toptv/?ref_=nv_tvv_250'
      );

      //check top tv shows container display
      commonElements.findElementAndCheckDisplay(
        tvShowTitleElement,
        'h1',
        moviesDatafilter.optionTvShows
      );
      cy.get(tvShowContainer)
        .should('be.visible')
        .within(() => {
          cy.get('.ipc-metadata-list')
            .find('.ipc-metadata-list-summary-item :visible')
            .contains(moviesDatafilter.topTvShowName)
            .and('have.attr', 'href', '/title/tt0903747/?ref_=chttvtp_t_1')
            .click();
        });

      commonElements.findElementAndCheckDisplay(
        movieTitleElement,
        'span',
        moviesDatafilter.tvShowName
      );

      //click on photos gallery
      cy.get('[data-testid="hero-parent"]')
        .find('[data-testid="hero__photo-link"]')
        .should('have.attr', 'href', '/title/tt0903747/mediaviewer/rm4224482560/?ref_=tt_ov_m_sm')
        .and('have.text', moviesDatafilter.photoGallery)
        .click();

      //should diplay the correct url
      cy.url().should('contain', '/title/tt0903747/mediaviewer/');

      //should display the photo gallery
      commonElements.checkContainerDisplay(actionBar);
      commonElements.checkContainerDisplay('[data-testid="media-viewer__touch-handler"]');

      cy.get(actionBar)
        .find('[data-testid="action-bar__gallery-count"]')
        .next()
        .should('have.attr', 'href', '/title/tt0903747/mediaindex/?ref_=tt_mv_sm')
        .click();

      //check photos container and filter
      cy.url().should('contain', '/title/tt0903747/mediaindex/');

      commonElements.checkContainerDisplay('.ipc-page-section');
      commonElements.checkContainerDisplay('.ipc-page-content-container');

      commonElements.findElementAndCheckDisplay(
        '.ipc-page-section',
        '.ipc-title h1',
        moviesDatafilter.sectionGalleryName
      );
      commonElements.findElementAndCheckDisplay(
        '.ipc-page-section',
        '[data-testid="subtitle"]',
        moviesDatafilter.tvShowName
      );

      //click on filter and type Dannys name in person section
      cy.get('.ipc-chip-dropdown')
        .find('[data-testid="image-chip-dropdown-test-id"]')
        .should('be.visible')
        .click();

      // check persons name are not active
      cy.get(`.ipc-promptable-base__content ${imageFilterContainer}`)
        .should('be.visible')
        .and('contain', moviesDatafilter.filterSection)
        .find('.ipc-chip-list__scroller')
        .within(() => {
          cy.get('[data-testid*="filter-menu-chip"]').should('have.attr', 'aria-pressed', 'false');
        });

      // select danny trejo's name
      cy.get(`.ipc-promptable-base__content ${imageFilterContainer}`)
        .should('be.visible')
        .and('contain', moviesDatafilter.filterSection)
        .find('.ipc-select__field-container select')
        .and('have.value', '')
        .select(moviesDatafilter.filterNameTvShow);

      // check modal danny trejo element
      cy.get(`.ipc-promptable-base__content ${imageFilterContainer}`)
        .find('.ipc-chip-list__scroller')
        .within(() => {
          cy.get('[data-testid*="filter-menu-chip"]')
            .should('have.attr', 'aria-pressed', 'true')
            .and('contain', moviesDatafilter.actorNameTvShow);
        });

      //close modal
      cy.get('[data-testid="promptable__x"]  button').click();

      //check photos page container
      commonElements.checkContainerDisplay('.ipc-page-section');
      commonElements.checkContainerDisplay('.ipc-page-content-container');

      commonElements.findElementAndCheckDisplay(
        '.ipc-page-section',
        '.ipc-title h1',
        moviesDatafilter.sectionGalleryName
      );
      commonElements.findElementAndCheckDisplay(
        '.ipc-page-section',
        '[data-testid="subtitle"]',
        moviesDatafilter.tvShowName
      );

      //select second photo
      cy.get('.ipc-page-content-container [data-testid="sub-section-images"]')
        .find('.ipc-image')
        .eq(1)
        .should('have.attr', 'alt', moviesDatafilter.galleryPhotoTitle)
        .click();
    });
  });
});
