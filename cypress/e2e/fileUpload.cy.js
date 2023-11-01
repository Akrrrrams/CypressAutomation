/// <reference types="cypress" />

describe('Cyperss File upload test', () => {
  /**
   * Step 1:
   * In order to upload files in Cypress we need to install plugin
   * we will run following command:
   * npm install -dev cypress-file-upload
   * Step 2:
   * we need to import necessary command to our project
   * in our support folder we have commands.js file: this file is a good place for putting our utility methods (functions)
   * add following line:
   * import 'cypress-file-upload';
   * Step 3:
   * The file that you want to upload should be in your fixture folder
   */

  beforeEach(() => {
    // run before each test case, beforeMethod in TestNG
    cy.clearCookies();
    cy.visit('/upload');
  });

  it('check upload Action', () => {
    cy.get('input#file-upload').attachFile('techIn2023.jpg');
    cy.get('input#file-submit').click();
    cy.get('#uploaded-files').then(() => {
      cy.contains('techIn2023.jpg').should('be.visible');
    });
  });
});
