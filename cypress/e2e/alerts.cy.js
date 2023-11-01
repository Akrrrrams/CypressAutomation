/// <reference types="cypress" />

describe('Alerts in Cypress Test Enviroment', { baseUrl: 'https://demoqa.com' }, () => {
  beforeEach(() => {
    // run before each test case
    cy.clearCookies;
    cy.visit('/alerts');
  });

  it('Check alert confimation', () => {
    // Browser commands, window:alert, window:confirm, window:on ...
    const stub = cy.stub(); // created a stub function
    // when this command initiated store and give the control to stub function
    cy.on('window:confirm', stub);

    cy.get('#confirmButton')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?');
      });

    cy.on('window:confirm', () => true); // confirm the alert

    cy.contains('You selected Ok').should('be.visible');
  });

  it('Check alert cancelation', () => {
    // Browser commands, window:alert, window:confirm, window:on ...
    const stub = cy.stub(); // created a stub function
    // when this command initiated store and give the control to stub function
    cy.on('window:confirm', stub);

    cy.get('#confirmButton')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?');
      });

    cy.on('window:confirm', () => false); // confirm the alert canceld

    cy.contains('You selected Cancel').should('be.visible');
  });
});
