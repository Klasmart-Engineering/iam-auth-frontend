import { homePage } from "../page_objects/homePage";
import {
    Then,
    When,
} from "cypress-cucumber-preprocessor/steps";

Then(`I see {string} in the title`, (title: string) => {
    cy.title().should(`include`, title);
});

Then(`I should see the welcome message {string}`, async (text: string) => {
    await homePage.getWelcomeText(text);
});

Then(`I am taken to {string}`, (text: string) => {
    homePage.getNotPartOfOrgText().should(`have.text`, text);
});

Then(`I sign out`, async () => {
    await homePage.clickOnProfile();
    homePage.clickOnSignoutLink();
    cy.removeCookies();
});

When(`I go to 404 page directly`, () => {
    cy.visit(`404`);
});

Then(`I should see error message {string}`, (errorText: string) => {
    cy.wait(1000).then(() => {
        cy.log(`waited for 1 seconds`);
    });
    cy.contains(errorText).should(`be.visible`);
});
