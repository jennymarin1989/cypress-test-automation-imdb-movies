import { commonElements, advanceSearchResults } from '../commons/commonElements';

describe('IMDB Req_id 1.4, ', () => {
  const currenDateAndMonth = commonElements.currentDateCalculation('MM-DD');
  const tvShowTitleElement = '[data-testid="tabbed-page-title"]';

  beforeEach(() => {
    commonElements.testInitialSetUp();
    cy.fixture('movies').as('moviesDataBirthday');
  });

  it('should be possible to filter photos by person in movie filter', () => {
    cy.get('@moviesDataBirthday').then((moviesDataBirthday) => {
      // check container display
      commonElements.clickOnMenuButton('Open Navigation Drawer');
      commonElements.selectMenuOption(
        moviesDataBirthday.titleCelebs,
        moviesDataBirthday.optionTitleCelebs,
        'nav-link-categories-celebs',
        '/feature/bornondate/?ref_=nv_cel_brn'
      );

      //check top tv shows container display
      commonElements.findElementAndCheckDisplay(
        tvShowTitleElement,
        'h1',
        moviesDataBirthday.advanceSearchCelebs
      );

      //check advance name search
      cy.url().should('contain', `/search/name/?birth_monthday=${currenDateAndMonth}`);

      //delete default search
      cy.get(`[data-testid=selected-input-chip-list-birthday-${currenDateAndMonth}]`).click();
      cy.get(advanceSearchResults).should('be.visible');

      //unfold birthday tab
      cy.get('[data-testid="accordion-item-birthdayAccordion"]').click();
      cy.get('[data-testid="birthday-input-test-id"]')
        .should('be.visible')
        .and('have.value', '')
        .focus()
        .type(`${currenDateAndMonth}{enter}`)
        .trigger('input');

      //click on see results
      cy.get(advanceSearchResults).click();

      //check label with day of birth
      cy.get(`[data-testid="selected-input-chip-list-birthday-${currenDateAndMonth}"] span`)
        .contains(`Birthday: ${currenDateAndMonth}`)
        .invoke('attr', 'style', 'position: relative')
        .should('be.visible');

      //find the third item on the list
      cy.get('.ipc-metadata-list')
        .find('.ipc-metadata-list-summary-item')
        .eq(2)
        .find('[data-testid="nlib-title"]')
        .click();

      //take a screenshot
      cy.screenshot();
    });
  });
});
