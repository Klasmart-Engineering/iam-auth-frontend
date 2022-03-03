import languageCodes from "../../configs/languageCodes";
import { homePage } from "../page_objects/homePage";
import { loginPage } from "../page_objects/loginPage";
import {
    And,
    Given,
    Then,
    When,
} from "cypress-cucumber-preprocessor/steps";

Then(`I see {string} in the title`, (title: string) => {
    cy.title().should(`include`, title);
});

Given(`I am on the kidsloop login page`, () => {
    loginPage.goToHomePage();
});

Then(`I should see the welcome message {string}`, async (text: string) => {
    await homePage.getWelcomeText(text);
});

Then(`I should see {string} under the user name`, (word: string) => {
    cy.wait(1000).then(() => {
        cy.log(`waited for 1 seconds`);
    });
    cy.contains(word).should(`be.visible`);
});

Then(`I am taken to {string}`, (text: string) => {
    homePage.getNotPartOfOrgText().should(`have.text`, text);
});

Then(`I sign out`, async () => {
    await homePage.clickOnProfile();
    homePage.clickOnSignoutLink();
});

And(`I click on sign out button on account not linked page`,()=> {
    homePage.clickOnSignoutButtonFromNotAssociatedWithOrgPage();
   // loginPage.verifyIfOnLoginPage();
});

When(`I go to {string} page directly`, (errorPage: string) => {
    cy.visit(errorPage);
});

Then(`I should see error message {string}`, (errorText: string) => {
    cy.wait(1000).then(() => {
        cy.log(`waited for 1 seconds`);
    });
    cy.contains(errorText).should(`be.visible`);
});

When(`I am redirected to the home page`, () => {
    cy.url().should(`contain`, Cypress.config(`baseUrl`));
});

When(`I wait for {string} mins`, (mins: number) => {
    cy.wait(mins*60*1000).then(() => {
        cy.log(`waited for ${mins} mins`);
    });
});

And(`I remove cookies`, ()=> {
    cy.removeCookies();
});

When(`I delete {string} cookie`, (cookiename: string) => {
   cy.clearCookie(cookiename);
   cy.wait(5000).then(() => {
      cy.log(`waited for 5000 milliseconds`);
  });
});