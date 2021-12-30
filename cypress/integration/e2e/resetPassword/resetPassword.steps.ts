import { And, Given, Then } from "cypress-cucumber-preprocessor/steps";
import { loginPage } from "../../page_objects/login-page";
import { createAccountPage } from "../../page_objects/create-account-page";
import {resetPasswordPage} from "../../page_objects/reset-password-page"
import { util } from "../../Utils/Utils";


And("I enter email , verification code and new password", async()=> {
    loginPage.enterEmailOrPhone(resetPasswordPage.getTestEmail());
    resetPasswordPage.clickOnSendVerificationCodeCreateAccount();
    util.generatePasscode(resetPasswordPage.getTestEmail(),resetPasswordPage.getVerificationcodeText());
    resetPasswordPage.clickOnVerfiyCodeButton();
    resetPasswordPage.clickOnCreateOrContinueButton();
    createAccountPage.enterNewPassword("Abcd1234");
    createAccountPage.reenterNewPassword("Abcd1234");
});

Given("I delete all the emails from test mail box",() => {
    resetPasswordPage.deleteAllEmail();
});

Given("I go to reset password page", ()=> {
    loginPage.goToHomePage();
    loginPage.clickForgetPasswordLink();
});

Given("I enter wrong verification code", ()=> {
    resetPasswordPage.enterCode('11111');
});

Given("I enter email and click on send verification code", () => {
    loginPage.enterEmailOrPhone(resetPasswordPage.getTestEmail());
    resetPasswordPage.clickOnSendVerificationCodeCreateAccount();
});

And('I click on verify code button',()=> {
    resetPasswordPage.clickOnVerfiyCodeButton();
});

And('I click on create account button',()=> {
    resetPasswordPage.clickOnCreateOrContinueButton();
});

Then("I should see the error message {string}", (text) => {
     cy.wait(2000);
    resetPasswordPage.getErrorTextEle().should('have.text',text);
});

Then("I should see the claim verification error message {string}",  (text) => {
    resetPasswordPage.getclaimVerificationErrorTextEle().should('have.text',text);
});

Then("I should see the verification failed error message {string}",  (text) => {
     resetPasswordPage.getVerificationFailedErrorTextEle().should('have.text',text);
 });
 
