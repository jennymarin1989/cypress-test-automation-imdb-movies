import { commonElements, advanceSearchResults } from '../commons/commonElements';

describe('IMDB Req_id 1.5, ', () => {
  const currentMonthAndDate = commonElements.currentDateCalculation('MM-DD');
  const currentYearAndMonth = commonElements.currentDateCalculation('YYYY-MM');
  const currenYearMonthDate = commonElements.endOfCurrentMonthCalculation('YYYY-MM-DD');
  const fourtyYearsBackDate = commonElements.fourtyYearsBackCalculation('YYYY-MM-DD');
  const fourtyYearsBackYearAndMonth = commonElements.fourtyYearsBackCalculation('YYYY-MM');
  const startMonthCalculation = commonElements.startOfCurrentMonthCalculation('YYYY-MM-DD');
  const labelDisplayData = commonElements.dateLabelDisplay();
  const tvShowTitleElement = '[data-testid="tabbed-page-title"]';
  const birthdateDataTestID = `[data-testid="selected-input-chip-list-birthday-${currentMonthAndDate}"]`;
  const birthYearMonthStart = '[data-testid="birthYearMonth-start"]';
  const birthDateStart = '[data-testid="birthDate-start"]';
  const birthYearMonthEnd = '[data-testid="birthYearMonth-end"]';

  beforeEach(() => {
    commonElements.testInitialSetUp();
    cy.fixture('movies').as('moviesDataBirthdate');
  });

  it('should be possible to filter by birthdate', () => {
    cy.get('@moviesDataBirthdate').then((moviesDataBirthdate) => {
      //check container display
      commonElements.clickOnMenuButton('Open Navigation Drawer');
      commonElements.selectMenuOption(
        moviesDataBirthdate.titleCelebs,
        moviesDataBirthdate.optionTitleCelebs,
        'nav-link-categories-celebs',
        '/feature/bornondate/?ref_=nv_cel_brn'
      );

      //check top tv shows container display
      commonElements.findElementAndCheckDisplay(
        tvShowTitleElement,
        'h1',
        moviesDataBirthdate.advanceSearchCelebs
      );

      //check advance name search
      cy.url().should('contain', `/search/name/?birth_monthday=${currentMonthAndDate}`);

      //delete default search
      cy.get(birthdateDataTestID).click();
      cy.get(birthdateDataTestID).should('not.exist');
      cy.get('.ipc-metadata-list').should('not.exist');
      cy.get(advanceSearchResults).should('be.visible');

      //unfold birthday tab
      cy.get('[data-testid="accordion-item-birthDateAccordion"]').click();

      cy.get(birthYearMonthStart).should('have.value', '').clear();
      cy.get(birthDateStart).should('have.value', '').clear();
      cy.get(birthYearMonthEnd).should('have.value', '').clear();

      //open date picker
      // cy.get(birthDateStart).focus().trigger('keydown', { keyCode: 32, which: 32, force: true })

      cy.get(birthDateStart).focus().type(fourtyYearsBackDate);
      cy.get(birthDateStart).should('have.value', fourtyYearsBackDate);

      cy.get(birthYearMonthStart).focus().should('have.value', fourtyYearsBackYearAndMonth);
      cy.get(birthDateStart).focus().type(startMonthCalculation);

      cy.get(birthYearMonthEnd).type(`${currentYearAndMonth}{enter}`).trigger('input');
      cy.get('[data-testid="birthDate-end"]').focus().should('have.value', currenYearMonthDate);

      //click on see results
      cy.get(advanceSearchResults).click();

      //verify label with results
      cy.get('[data-testid="selected-input-chip-list-birthDate-Birth date"] span')
        .contains(`Birth date: ${labelDisplayData}`)
        .invoke('attr', 'style', 'position: relative')
        .should('be.visible');

      // find the third item on the list
      cy.get('.ipc-metadata-list .ipc-metadata-list-summary-item')
        .first()
        .find('[data-testid="nlib-known-for-title"]')
        .then((element) => element.length > 0 && cy.get(element).click());

      // take a screenshot
      cy.screenshot();
    });
  });
});
