import moment from 'moment';

const navElementDisplay = 'nav[id="imdbHeader"]';
const searchInput = 'input[id="suggestion-search"]';
const searchButton = 'button[id="suggestion-search-button"]';
const menuElement = 'label[id="imdbHeader-navDrawerOpen"]';
const navLinkElement = '[data-testid="nav-link-category"]';
const optionFromMenuElement = '[data-testid="category-expando"]';
const acceptCookiesElement = '[data-testid="accept-button"]';
const startDayOfMonth = moment().startOf('month').subtract(40, 'years');
const lastDayOfMonth = moment().endOf('month');

export const advanceSearchResults = '[data-testid="adv-search-get-results"]';

export const commonElements = {
  testInitialSetUp: () => {
    cy.visit('');
    cy.viewport('macbook-16');
    commonElements.checkContainerDisplay(navElementDisplay);
    cy.get(acceptCookiesElement).click({ force: true });
  },

  checkContainerDisplay: (valueContainer) => {
    cy.get(valueContainer, { timeout: 4000 }).should('be.visible');
  },

  checkTitleDisplay: (titleElementID, name) => {
    cy.get(titleElementID).should('have.text', name);
  },

  findElementAndCheckDisplay: (elementSelector, element, text) => {
    cy.get(elementSelector).find(element).should('be.visible').and('have.text', text);
  },

  setInputToSearch: (value) => {
    cy.get(searchInput).clear();
    cy.get(searchInput).type(value);
  },

  clickSearchButton: () => {
    cy.get(searchButton).click();
  },

  clickOnMenuButton: (value) => {
    cy.get(menuElement).should('have.attr', 'aria-label', value).click();
  },

  selectMenuOption: (optionMenuTitle, optionMenuValue, navLinkCategory, newPath) => {
    const href = `a[href="${newPath}"]`;

    cy.get(navLinkElement)
      .find(`${optionFromMenuElement}:contains(${optionMenuTitle})`)
      .should('have.attr', 'for', navLinkCategory)
      .and('have.text', optionMenuTitle)
      .next()
      .within(() => {
        cy.get('.navlinkcat__listContainerInner')
          .find(href)
          .should('have.text', optionMenuValue)
          .click();
      });
  },

  currentDateCalculation: (dateFormat) => {
    const currentDate = moment().format(dateFormat);
    return currentDate;
  },

  endOfCurrentMonthCalculation: (dateFormat) => {
    const lastDate = lastDayOfMonth.format(dateFormat);
    return lastDate;
  },

  startOfCurrentMonthCalculation: (dateFormat) => {
    const startOfCurrentMonth = startDayOfMonth.format(dateFormat);
    return startOfCurrentMonth;
  },

  yesterdayDateCalculation: (dateformat) => {
    const yesterdayDate = moment().subtract(1, 'days');
    const yesterdayNewFormat = yesterdayDate.format(dateformat);
    return yesterdayNewFormat;
  },

  fourtyYearsBackCalculation: (dateFormat) => {
    const fourtyYearsBackDate = moment().subtract(40, 'years');
    const fourtyYearsBackFormat = fourtyYearsBackDate.format(dateFormat);
    return fourtyYearsBackFormat;
  },

  dateLabelDisplay: () => {
    const startOfMonth = startDayOfMonth.format('LL');
    const lastDateOfMonth = lastDayOfMonth.format('LL');
    return `${startOfMonth} to ${lastDateOfMonth}`;
  }
};
