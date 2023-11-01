import { auth } from '../../support/pages/auth';
import { NavigateTo, navigateTo } from '../../support/navigation';

const LoginLocators = require('../../support/pages/auth'); // this way reachers all objects of auth

describe('Auth: Login user with different ways', () => {
  // navegate to the test page
  beforeEach('navigate to login page', () => {
    cy.clearAllCookies();
    navigateTo.loginPage();
  });

  it.skip('Happy path scenario using POM function', () => {
    // auth.login('hardcode variable') -- not good way
    cy.fixture('user').then((user) => {
      auth.login(user.user2.username, user.user2.password);
    });
    // let's call our custom command to verify that text
    cy.textExists('You logged into a secure area!');
    auth.logout();
  });

  it('Happy Path scenario using POM locators', () => {
    cy.fixture('user').then((user) => {
      // need to import locators object
      LoginLocators.locators.username.type(user.user2.username);
      LoginLocators.locators.password.type(user.user2.password);
      LoginLocators.locators.submit.click();
    });
    cy.textExists('You logged into a secure area!');
    auth.logout();
  });

  it('Check invalid user credentials', () => {
    auth.login('invalid234', 'invalid234'); // beauty of re-usability
    // verify error message
    cy.textExists('Your username is invalid!');
  });
});
