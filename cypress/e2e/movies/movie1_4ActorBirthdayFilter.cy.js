import { commonElements, advanceSearchResults } from '../commons/commonElements';

describe('IMDB Req_id 1.4, verify that user can search for celebrities born yesterday ', () => {
  const currenDateAndMonth = commonElements.currentDateCalculation('MM-DD');
  const tvShowTitleElement = '[data-testid="tabbed-page-title"]';

  beforeEach(() => {
    commonElements.testInitialSetUp();
    cy.fixture('movies').as('moviesDataBirthday');
  });

  it('TC_006, should the user search for celebrity by giving a valid date and take a snapshot of celebrity profile', () => {
    cy.get('@moviesDataBirthday').then((moviesDataBirthday) => {
      //check container display
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

      //unfold birthday tab and enter valid date
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

  it.only('TC_007, user should not be able to the search for celebrity by giving an invalid date', () => {
    cy.get('@moviesDataBirthday').then((moviesDataBirthday) => {
      //check container display
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

      //unfold birthday tab and enter invalid date
      cy.get('[data-testid="accordion-item-birthdayAccordion"]').click();
      cy.get('[data-testid="birthday-input-test-id"]')
        .should('be.visible')
        .and('have.value', '')
        .focus()
        .type('13-01{enter}')
        .trigger('input');

      //click on see results
      cy.get(advanceSearchResults).should('have.attr', 'aria-disabled', 'true');

      //find the third item on the list
      cy.get('.ipc-metadata-list').should('not.exist');
    });
  });
});
