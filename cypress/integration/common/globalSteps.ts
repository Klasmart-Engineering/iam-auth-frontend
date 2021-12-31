import { homePage } from "../page_objects/home-page";
import { loginPage } from '../page_objects/login-page';
import { Then } from "cypress-cucumber-preprocessor/steps";

Then(`I see {string} in the title`, (title: string) => {
    cy.title().should(`include`, title);
});

Then(`I should see the welcome message {string}`, (text: string) => {
    homePage.getWelcomeText().contains(text);
});

Then(`I am taken to {string}`, (text: string) => {
    homePage.getNotPartOfOrgText().should(`have.text`, text);
});

Then(`I sign out`, async () => {
    await homePage.clickOnProfile();
    homePage.clickOnSignoutLink();
    cy.removeCookies();
});

Then(`I should see login page`, () => {
    loginPage.checkURL();
});
