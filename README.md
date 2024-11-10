# Cypress IMDb test automation

<div align="center">
    <img width="367" alt="header" src="https://github.com/user-attachments/assets/e8b11bb0-e0b8-4f35-89a4-3eb5fd8d09be"/>
   
</div>

## About this project...

The main goal of this project is to systematically apply a set of activities in order to achieve a testing objective in different scenarios on the IMDb website. In order to achieve these objectives, Cypress was used as a modern Javascript-based E2E framework, very powerful and easy to use.

<div align="center">
  <img width="147" alt="header" src="https://github.com/user-attachments/assets/64c36959-f2e0-4f67-b6cc-ed2bfc7c8e2d"/>
</div>

## Approach

To approach this project, as an individual, I have followed the testing process activities as a guide to work and structure this project:

- Testing Plan: Defined testing objectives, understood the documentation given about different scenarios and started the definition of user requirements

- Test monitoring: Defined the implementation of Test coverage (RTM)

- Test Analysis: Defined what to test, following the Risk Based Technique, identifying potential risks of failure and prioritizing the testing efforts in each scenario.

- Test design: Designed the manual test cases utilizing spreadsheet program like excel

- Test implementation: Created the test scripts in Cypress for the different scenarios

- Test Execution: Automated test cases were executed in different browsers. Bug report was implemented when need it

- Test completion: Review the RTM coverage reports and analyzed lessons learned

## File structure

<div align="center">
    <img width="350" alt="header" src="https://github.com/user-attachments/assets/1330017f-88ab-46f1-badc-c133681ea15b"/>
</div>

## Testing spec outcome

<div align="center">

![Screenshot 2024-10-28 at 12 10 21](https://github.com/user-attachments/assets/890144db-c6ea-41c8-9540-e38e49ee8254)

</div>

## Good practices

- Test specs wrote in isolation

- Used data-testid (when applicable) to access the selectors

- Used alias to access and store data

- Used fixture folder as a fixed set of data

- Reused methods across the project stored in commons folder

- Implemented ESlint and Prettier for code formatting

- No need to add videoUploadOnPasses on the configuration file as this property was removed in Cypress ^13.0.0 [Cypress docs](https://docs.cypress.io/app/references/changelog#13-0-0)

## Installing

- **Note that you should have installed NodeJS ^18.18.0 to proceed with steps below**

- Clone the project to your local directory

- `$git clone https://github.com/jennymarin1989/moviesTechTest.git`

- `$cd moviesTechTest`

- `$npm install`

- `$cy:open` (to run cypress in browser window)

- `$cy:run` (to run cypress headless in terminal)

## Technologies:

- NodeJS ^18.18.0

- cypress ^13.15.0

## Author

Jenny Arenas
