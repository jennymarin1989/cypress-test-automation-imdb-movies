import moment from 'moment'

const searchInput = "input[id='suggestion-search']"
const searchButton = "button[id='suggestion-search-button']"
const menuElement = 'label[id="imdbHeader-navDrawerOpen"]'
const navLinkElement = '[data-testid="nav-link-category"]'
const optionFromMenuElement = '[data-testid="category-expando"]'
const startDayOfMonth = moment().startOf('month').subtract(40, 'years')
const lastDayOfMonth = moment().endOf('month')

export const commonElements = {
  checkContainerDisplay: (valueContainer) => {
    cy.get(valueContainer).should('be.visible')
  },

  checkTitleDisplay: (titleElementID, name) => {
    cy.get(titleElementID).should('have.text', name)
  },

  findElementAndCheckDisplay: (elementSelector, element, text) => {
    cy.get(elementSelector)
      .find(element)
      .should('be.visible')
      .and('have.text', text)
  },

  setInputToSearch: (value) => {
    //check that first value is '' **
    cy.get(searchInput).type(value)
    // trigger('keydown ', { key: 'Enter', force: true })

    // clear input after search
  },

  clickSearchButton: () => {
    cy.get(searchButton).click()
  },

  clickOnMenuButton: (value) => {
    cy.get(menuElement).should('have.attr', 'aria-label', value).click()
  },

  //optionmenuvalue - movies
  selectMenuOption: (
    optionMenuTitle,
    optionMenuValue,
    navLinkCategory,
    newPath
  ) => {
    const href = `a[href="${newPath}"]`

    cy.get(navLinkElement)
      .find(`${optionFromMenuElement}:contains(${optionMenuTitle})`)
      .should('have.attr', 'for', navLinkCategory)
      .and('have.text', optionMenuTitle)
      .next()
      .within(() => {
        cy.get('.navlinkcat__listContainerInner')
          .find(href)
          .should('have.text', optionMenuValue)
          .click()
      })
  },

  currentDateCalculation: (dateFormat) => {
    const currentDate = moment().format(dateFormat)
    return currentDate
  },

  endOfCurrentMonthCalculation: (dateFormat) => {
    const lastDate = lastDayOfMonth.format(dateFormat)
    return lastDate
  },

  startOfCurrentMonthCalculation: (dateFormat) => {
    const yesterdayNewFormat = startDayOfMonth.format(dateFormat)
    return yesterdayNewFormat
  },

  yesterdayDateCalculation: (dateformat) => {
    const yesterdaydate = moment().subtract(1, 'days')
    const yesterdayNewFormat = yesterdaydate.format(dateformat)
    return yesterdayNewFormat
  },

  fourtyYearsBackCalculation: (dateFormat) => {
    const yesterdaydate = moment().subtract(40, 'years')
    const yesterdayNewFormat = yesterdaydate.format(dateFormat)
    return yesterdayNewFormat
  },

  dateLabelDisplay: () => {
    const fourtyYearsDateLabel = startDayOfMonth.format('LL')
    const currentDateLabel = lastDayOfMonth.format('LL')
    return `${fourtyYearsDateLabel} to ${currentDateLabel}`
  }
}
