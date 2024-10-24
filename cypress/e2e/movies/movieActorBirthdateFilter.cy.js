import { commonElements } from '../commons/commonElements'

describe('IMDB Req_id 1.5, ', () => {
  // crear data test en fixtures
  const navElementDisplay = 'nav[id="imdbHeader"]'
  const menuOptionTitle = 'Celebs'
  const tvShowTitleElement = '[data-testid="tabbed-page-title"]'

  const currentMonthAndYear = commonElements.currentDateCalculation('MM-YY')
  const currenYearAndMonth = commonElements.currentDateCalculation('YYYY-MM')
  const currenYearMonthDate =
    commonElements.endOfCurrentMonthCalculation('YYYY-MM-DD')
  const fourtyYearsBackDate =
    commonElements.fourtyYearsBackCalculation('YYYY-MM-DD')
  const fourtyYearsBackYearAndMonth =
    commonElements.fourtyYearsBackCalculation('YYYY-MM')
  const startMonthCalculation =
    commonElements.startOfCurrentMonthCalculation('YYYY-MM-DD')
  const birthdateDataTestID = `[data-testid="selected-input-chip-list-birthday-${currentMonthAndYear}"]`
  const labelDisplayData = commonElements.dateLabelDisplay()

  beforeEach(() => {
    cy.visit('')
    cy.on('uncaught:exception', (err, runnable) => {
      expect(err.message).to.include('{}')
      return false
    })
    cy.viewport('macbook-16')

    // it should be possible to visualize navbar and main searchbox container **
    commonElements.checkContainerDisplay(navElementDisplay)
    cy.get('[data-testid="accept-button"]').click()
  })

  it('should be possible to filter by birthdate', () => {
    //check container display
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
      `/search/name/?birth_monthday=${currentMonthAndYear}`
    )

    //delete default search
    cy.get(birthdateDataTestID).click()
    cy.get(birthdateDataTestID).should('not.exist')
    cy.get('.ipc-metadata-list').should('not.exist')
    cy.get('[data-testid="adv-search-get-results"]').should('be.visible')

    //unfold birthday tab
    cy.get('[data-testid="accordion-item-birthDateAccordion"]').click()

    cy.get('[data-testid="birthYearMonth-start"]')
      .should('have.value', '')
      .clear()
    cy.get('[data-testid="birthDate-start"]').should('have.value', '').clear()
    cy.get('[data-testid="birthYearMonth-end"]')
      .should('have.value', '')
      .clear()

    //open date picker
    // cy.get('[data-testid="birthDate-start"]').focus().type('')

    // 'keydown', { keyCode: 32, which: 32, force: true })

    cy.get('[data-testid="birthDate-start"]').focus().type(fourtyYearsBackDate)
    cy.get('[data-testid="birthDate-start"]').should(
      'have.value',
      fourtyYearsBackDate
    )

    cy.get('[data-testid="birthYearMonth-start"]')
      .focus()
      .should('have.value', fourtyYearsBackYearAndMonth)
    cy.get('[data-testid="birthDate-start"]')
      .focus()
      .type(startMonthCalculation)

    //valid input ***
    cy.get('[data-testid="birthYearMonth-end"]')
      .type(`${currenYearAndMonth}{enter}`)
      .trigger('input')
    cy.get('[data-testid="birthDate-end"]')
      .focus()
      .should('have.value', currenYearMonthDate)

    //click on see results
    cy.get('[data-testid="adv-search-get-results"]').click()

    //verify label with results

    cy.get('[data-testid="selected-input-chip-list-birthDate-Birth date"] span')
      .contains(`Birth date: ${labelDisplayData}`)
      .invoke('attr', 'style', 'position: relative')
      .should('be.visible')

    // find the third item on the list
    cy.get('.ipc-metadata-list .ipc-metadata-list-summary-item')
      .first()
      .find('[data-testid="nlib-known-for-title"]')
      .then((element) => element.length > 0 && cy.get(element).click())

    // take a screenshot
    cy.screenshot()
  })
})
