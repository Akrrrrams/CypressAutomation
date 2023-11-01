describe('How to do API test with cypress', ()=> {
it('Simple Get reqwuest, check status header and body', ()=>{
    cy.request({ //this method it take a joson object as paramiter, and instance

        method:'GET',
        url:`${Cypress.env('apiUrl')}${Cypress.env('apiBooks')}`,
        //other than method and url rest of the option depend on the test case 
        failOnStatusCode: false

    }).then((response) =>{
        expect(response.status).to.equal(200);
        //cy.log(response.body.books[0].isbn);
        expect(response.body.books[1].title).to.equal('Learning JavaScript Design Patterns');
        expect(response.headers.connection).to.equal('keep-alive');

        const { books } = response.body.books;

      // a loop for verification title
      cy.fixture('booksTitles').then((expectedBookTitle) => {
        for (let i = 0; i < 8; i++) {
          expect(response.body.books[i].title).to.equal(expectedBookTitle[i]);
          console.log(expectedBookTitle[i]);
        }
      });
    });
});
});