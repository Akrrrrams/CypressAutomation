/// <reference types="cypress" />

describe('Context: My First Tests', () => {
  before(() => {
    // reun once before all test
  });

  beforeEach(() => {
    // run before each test case
    cy.clearCookies;
  });
  after(() => {
    // similar to after class in testNG
  });

  afterEach(() => {
    // similar to afterMeyhod in TestNG
  });

  it('opeing a web appliaction', () => {
    cy.visit('registration_form');
    // cy.get(':nth-child(8) > a').click();
    // cy.get('.nav-link').click();
  });

  it('Test 2', () => {
    expect(false).to.equal(false);
  });

  it('Test 3', () => {
    expect(false).not.to.equal(true);
  });

  it('Test 4', () => {
    expect(5).to.equal(5);
  });
  it('Test 5', () => {
    expect(true).to.equal('5' == 5);
  });
});
