import { Then } from "cypress-cucumber-preprocessor/steps";
import { homePage } from "../page_objects/home-page";
import { loginPage } from '../page_objects/login-page';

Then(`I see {string} in the title`, title => {
  cy.title().should("include", title);
});

Then("I should see the welcome message {string}", async (text) => {
  await homePage.getWelcomeText().contains(text);
 });
 
 Then("I am taken to {string}", (text) => {
   homePage.getNotPartOfOrgText().should('have.text',text);
 });

 

 Then("I sign out", () => {
  cy.wait(2000);
  homePage.clickOnProfile();
  homePage.clickOnSignoutLink();
  cy.removeCookies();
});

 Then('I should see login page', () => {
   loginPage.checkURL();
 });