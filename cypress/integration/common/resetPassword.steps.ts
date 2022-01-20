
import config from "../../configs/config";
import { createAccountPage } from "../page_objects/createAccountPage";
import { loginPage } from "../page_objects/loginPage";
import { resetPasswordPage } from "../page_objects/resetPasswordPage";
import { passcodeUtils } from "../utils/passcodeUtils";
import {
    And,
    Given,
    Then,
    When,
} from "cypress-cucumber-preprocessor/steps";

And(`I enter email , verification code and new password`,  ()=> {
    resetPasswordPage.enterEmail(resetPasswordPage.getTestEmail());
    resetPasswordPage.clickOnSendCodeButton();
    passcodeUtils.generatePasscode(resetPasswordPage.getTestEmail(), resetPasswordPage.getVerificationcodeText());
    resetPasswordPage.clickOnVerfiyCodeButton();
    resetPasswordPage.clickOnCreateOrContinueButton();
    createAccountPage.enterNewPassword(config.password);
    createAccountPage.reenterNewPassword(config.password);
});

Given(`I delete all the emails from test mail box`, () => {
    resetPasswordPage.deleteAllEmail();
});

Given(`I go to reset password page`, ()=> {
    loginPage.goToHomePage();
    loginPage.clickForgetPasswordLink();
});

When(`I click on reset code button`, ()=> {
    resetPasswordPage.clickOnSendCodeButton();
});

Given(`I enter wrong verification code`, ()=> {
    resetPasswordPage.enterCode(`11111`);
});

Given(`I enter email and click on send verification code`, () => {
    resetPasswordPage.enterEmail(resetPasswordPage.getTestEmail());
    resetPasswordPage.clickOnSendVerificationCodeCreateAccount();
});

Given(`I enter email and click on send reset code`, () => {
    resetPasswordPage.enterEmail(resetPasswordPage.getTestEmail());
    resetPasswordPage.clickOnSendCodeButton();
});

And(`I click on verify code button`, ()=> {
    resetPasswordPage.clickOnVerfiyCodeButton();
});

And(`I click on create account button`, ()=> {
    resetPasswordPage.clickOnCreateOrContinueButton();
});

Then(`I should see the error message {string}`, (errorText: string) => {
    resetPasswordPage.getErrorTextEle().should(`have.text`, errorText);
});

Then(`I should see the claim verification error message {string}`,  (errorText: string) => {
    resetPasswordPage.getclaimVerificationErrorTextEle().should(`have.text`, errorText);
});

Then(`I should see the verification failed error message {string}`,  (errorText: string) => {
    resetPasswordPage.getVerificationFailedErrorTextEle().should(`have.text`, errorText);
});
