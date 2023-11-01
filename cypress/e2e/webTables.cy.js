/// <reference types="cypress" />

describe('Cyperss webTable test', { baseUrl: 'https://demoqa.com' }, () => {
  beforeEach(() => {
    // run before each test case, beforeMethod in TestNG
    cy.clearCookies();
    cy.visit('/webtables');
  });

  it('check finding and editing a record', () => {
    // locate table body - then naviagte through this element to find Alden, then update info with another person
    cy.get('.rt-tbody')
      .contains('.rt-tr-group', 'Alden') // get the body and row contain Alen
      .then((row) => {
        cy.wrap(row).find('[title="Edit"]').click();
        cy.get('#firstName').clear().type('Harvy');
        cy.get('#lastName').clear().type('bababa');
        cy.get('#submit').click();
        cy.wrap(row).find('.rt-td').eq(0).should('contain', 'Harvy');
        cy.wrap(row).find('.rt-td').eq(1).should('contain', 'bababa');
      });
  });

  it('check finding and deleting a record', () => {
    // locate table body - then naviagte through this element to find Alden, then update info with another person
    cy.get('.rt-tbody')
      .contains('.rt-tr-group', 'Alden') // get the body and row contain Alen
      .then((row) => {
        cy.wrap(row).find('[title="Delete"]').click();
        // Assewrt that table doesn't have Alden record
        cy.get('.rt-tbody').should('not.contain', 'Alden');
        // search for Alden in the body
        cy.get('#searchBox').type('Alden');
        // Assert that there is no record
        cy.get('.rt-tbody').should('not.contain', 'Alden');
        // no data found element is visiable ot not
        cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');
      });

    it('Check search for different age records', () => {
      // define age groups
      const ageGroup = [29, 39, 45, 77];
      // for each age group perform same test scenario
      cy.wrap(ageGroup).each((age) => {
        // type age into search box
        cy.get('#searchBox').clear().type(age);
        // verify if that age exists, second number of records
        if (age === 77) {
          // negative scenario
          cy.get('.rt-tbody').find('.rt-tr-group').first().should('not.contain', age);
          cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');
        } else {
          // positive scenario
          cy.get('.rt-tbody').find('.rt-tr-group').first().should('contain', age);
          cy.get('.rt-tbody').contains('.rt-tr-group', age).should('have.length', 1);
        }
      });

      it('Check adding a new record - Bad code practice', () => {
        // click on add button
        cy.get('#addNewRecordButton').click();
        // fill form
        cy.get('#firstName').type('Harvey');
        cy.get('#lastName').type('Specter');
        cy.get('#userEmail').type('specter@example.com');
        cy.get('#age').type('40');
        cy.get('#salary').type('70000');
        cy.get('#department').type('legal');
        cy.get('#submit').click();
        // assert that new record is added
        cy.get('.rt-tbody')
          .contains('.rt-tr-group', 'Harvey')
          .then((row) => {
            cy.wrap(row).find('.rt-td').eq(0).should('contain', 'Harvey');
            cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Specter');
            cy.wrap(row).find('.rt-td').eq(2).should('contain', '40');
            cy.wrap(row).find('.rt-td').eq(3).should('contain', 'specter@example.com');
            cy.wrap(row).find('.rt-td').eq(4).should('contain', '70000');
            cy.wrap(row).find('.rt-td').eq(5).should('contain', 'legal');
          });
      });
    });
  });
});
