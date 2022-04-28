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
    resetPasswordPage.setNewPassword();
    createAccountPage.enterNewPassword(resetPasswordPage.getNewPasswordValue());
    createAccountPage.reenterNewPassword(resetPasswordPage.getNewPasswordValue());
});

And(`I enter email and verification code`,  ()=> {
    resetPasswordPage.enterEmail(config.sendNewCodeResetPasswordTestEmail);
    resetPasswordPage.clickOnSendCodeButton();
    passcodeUtils.generatePasscode(config.sendNewCodeResetPasswordTestEmail, resetPasswordPage.getVerificationcodeText());
});

And(`I enter deactivated email and verification code`,  ()=> {
    resetPasswordPage.enterEmail(config.deactivatedAccountEmailAddress);
    resetPasswordPage.clickOnSendCodeButton();
    passcodeUtils.generatePasscode(config.deactivatedAccountEmailAddress, resetPasswordPage.getVerificationcodeText());
});

And(`I login with the email for which we have reset the password`, ()=> {
    cy.wait(2000).then(() => {
        cy.log(`waited for 2 seconds`);
    });
    loginPage.goToHomePage();
    loginPage.enterEmailAndPassword(resetPasswordPage.getTestEmail(), resetPasswordPage.getNewPasswordValue());
    loginPage.clickOnLogInButton();
});

And(`I login with the phone Number for which we have reset the password`, ()=> {
    cy.wait(2000).then(() => {
        cy.log(`waited for 2 seconds`);
    });
    loginPage.goToHomePage();
    loginPage.clickOnLoginWithPhoneNumberLink();
    createAccountPage.selectCountry(`United States(+1)`);
    loginPage.enterPhone(config.mailosaurPhoneNumber.substring(1));
    loginPage.clickContinue();
    loginPage.enterPassword(config.newPassword);
    loginPage.clickOnLogInButton();
});

Given(`I delete all the emails from test mail box`, () => {
    resetPasswordPage.deleteAllEmail();
});

Given(`I go to reset password page`, ()=> {
    loginPage.goToHomePage();
    loginPage.clickForgetPasswordLink();
});

And(`I click on send new code button`, () => {
    resetPasswordPage.clickOnSendNewCodeButton();
});

When(`I enter the old passcode`, ()=> {
    resetPasswordPage.enterCode(resetPasswordPage.latestPasscode);
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

And(`I enter the new passcode from email`, ()=> {
    passcodeUtils.generatePasscode(config.sendNewCodeResetPasswordTestEmail, resetPasswordPage.getVerificationcodeText());
});

And(`I enter the new passcode from phone number`, ()=> {
    passcodeUtils.generatePasscodeFromSMS(config.mailosaurPhoneNumber, resetPasswordPage.getVerificationcodeText());
});

And(`I verify code and confirm the password`, ()=> {
    resetPasswordPage.clickOnVerfiyCodeButton();
    resetPasswordPage.clickOnCreateOrContinueButton();
    resetPasswordPage.setNewPassword();
    createAccountPage.enterNewPassword(resetPasswordPage.getNewPasswordValue());
    createAccountPage.reenterNewPassword(resetPasswordPage.getNewPasswordValue());
});
And(`I verify code for phone number and confirm the password`, ()=> {
    resetPasswordPage.clickOnVerfiyCodeButtonForPhoneNumber();
    resetPasswordPage.clickOnCreateOrContinueButton();
    resetPasswordPage.setNewPassword();
    createAccountPage.enterNewPassword(config.newPassword);
    createAccountPage.reenterNewPassword(config.newPassword);
});

And(`I enter wrong passcode for reset`, ()=> {
    loginPage.clickForgetPasswordLink();
    resetPasswordPage.clickOnSendCodeButtonOnPhoneNumber();
    resetPasswordPage.enterCode(`123456`);
    resetPasswordPage.clickOnVerfiyCodeButtonForPhoneNumber();
});

And(`I click on send new code for phone number reset password`, ()=> {
    resetPasswordPage.clickOnSendNewCodeButtonPhoneNumber();
});

When(`I reset password for a phone number`, ()=> {
    loginPage.goToHomePage();
    loginPage.clickOnLoginWithPhoneNumberLink();
    createAccountPage.selectCountry(`United States(+1)`);
    loginPage.enterPhone(config.mailosaurPhoneNumber.substring(1));
    cy.wait(4000);
    loginPage.clickContinue();
    loginPage.clickForgetPasswordLink();
    resetPasswordPage.clickOnSendCodeButtonOnPhoneNumber();
    cy.wait(1000).then(() => {
        cy.log(`waited for 2 seconds`);
    });
    passcodeUtils.generatePasscodeFromSMS(config.mailosaurPhoneNumber, resetPasswordPage.getVerificationcodeText());
    resetPasswordPage.clickOnVerfiyCodeButtonForPhoneNumber();
    resetPasswordPage.clickOnCreateOrContinueButton();
    resetPasswordPage.setNewPassword();
    createAccountPage.enterNewPassword(config.newPassword);
    createAccountPage.reenterNewPassword(config.newPassword);
});

And(`I click on continue button`, ()=> {
    resetPasswordPage.clickOnCreateOrContinueButton();
});