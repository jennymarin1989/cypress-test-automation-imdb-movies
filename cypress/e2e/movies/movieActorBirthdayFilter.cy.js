import { commonElements } from '../commons/commonElements'

describe('IMDB Req_id 1.4, ', () => {
  // crear data test en fixtures
  const navElementDisplay = 'nav[id="imdbHeader"]'
  const menuOptionTitle = 'Celebs'
  const tvShowTitleElement = '[data-testid="tabbed-page-title"]'
  const currenDateAndMonth = commonElements.currentDateCalculation('MM-YY')

  beforeEach(() => {
    cy.visit('')
    cy.on('uncaught:exception', (err, runnable) => {
      // expect(err.message).to.include('{}')
      return false
    })
    cy.viewport('macbook-16')

    // it should be possible to visualize navbar and main searchbox container **
    commonElements.checkContainerDisplay(navElementDisplay)
    cy.get('[data-testid="accept-button"]').click()
  })

  it('should be possible to filter photos by person in movie filter', () => {
    const dateAndYearFormat = commonElements.yesterdayDateCalculation('MM-DD')

    // check container display
    commonElements.clickOnMenuButton('Open Navigation Drawer')
    commonElements.selectMenuOption(
      menuOptionTitle,
      'Born Today',
      'nav-link-categories-celebs',
      '/feature/bornondate/?ref_=nv_cel_brn'
    )

    //check top tv shows container display
    commonElements.findElementAndCheckDisplay(
      tvShowTitleElement,
      'h1',
      'Advanced name search'
    )

    //check advance name search
    cy.url().should(
      'contain',
      `/search/name/?birth_monthday=${currenDateAndMonth}`
    )

    //delete default search
    cy.get(
      `[data-testid=selected-input-chip-list-birthday-${currenDateAndMonth}]`
    ).click()
    cy.get('[data-testid="adv-search-get-results"]').should('be.visible')

    //unfold birthday tab
    cy.get('[data-testid="accordion-item-birthdayAccordion"]').click()
    cy.get('[data-testid="birthday-input-test-id"]')
      .should('be.visible')
      .and('have.value', '')
      .focus()
      .type(`${currenDateAndMonth}{enter}`)
      .trigger('input')

    //click on see results
    cy.get('[data-testid="adv-search-get-results"]').click()

    //check label with day of birth
    cy.get(
      `[data-testid="selected-input-chip-list-birthday-${currenDateAndMonth}"] span`
    )
      .contains(`Birthday: ${currenDateAndMonth}`)
      .invoke('attr', 'style', 'position: relative')
      .should('be.visible')

    //find the third item on the list
    cy.get('.ipc-metadata-list')
      .find('.ipc-metadata-list-summary-item')
      .eq(2)
      .find('[data-testid="nlib-title"]')
      .click()

    //take a screenshot
    cy.screenshot()
  })
})

//Birth date: ${labelDisplayData}
