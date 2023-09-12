/// <reference types="cypress" />

describe('Cyperss webTable test',{baseUrl:'https://demoqa.com'}, () => {

   beforeEach(() => {
     // run before each test case, beforeMethod in TestNG
     cy.clearCookies();
     cy.visit('/webtables')
   });

   it('check finding and editing a record',() => {
    // locate table body - then naviagte through this element to find Alden, then update info with another person
     cy.get('.rt-tbody').contains('.rt-tr-group','Alden')  //get the body and row contain Alen
     .then((row)=> {
      cy.wrap(row).find('[title="Edit"]').click();
      cy.get('#firstName').clear().type('Harvy');
      cy.get('#lastName').clear().type('bababa');
      cy.get('#submit').click();
      cy.wrap(row).find('.rt-td').eq(0).should('contain','Harvy');
      cy.wrap(row).find('.rt-td').eq(1).should('contain','bababa');
     })
     

      })

   });
  
