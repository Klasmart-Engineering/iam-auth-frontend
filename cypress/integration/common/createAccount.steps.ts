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

When(`I create a new account with a new email address`, ()=> {
    createAccountPage.createNewEmail();
    resetPasswordPage.deleteAllEmail(); // All the emails come to the same account
    loginPage.goToHomePage();
    loginPage.clickOnsignupWithEmail();
    createAccountPage.enterEmailOrPhone(createAccountPage.getNewEmail());
    createAccountPage.clickOnSendVerificationCodeCreateAccount();
    passcodeUtils.generatePasscode(createAccountPage.getNewEmail(), resetPasswordPage.getVerificationcodeText());
    resetPasswordPage.clickOnVerfiyCodeButton();
    createAccountPage.enterNewPassword(config.password);
    createAccountPage.reenterNewPassword(config.password);
    createAccountPage.acceptPrivacyPolicy();
    resetPasswordPage.clickOnCreateOrContinueButton();
});

When(`I create a new account with a new email address with upper case letters`, ()=> {
    createAccountPage.createNewEmail();
    resetPasswordPage.deleteAllEmail(); // All the emails come to the same account
    loginPage.goToHomePage();
    loginPage.clickOnsignupWithEmail();
    createAccountPage.enterEmailOrPhone(createAccountPage.getNewEmail().replace(`auto`, `AUTO`));
    createAccountPage.clickOnSendVerificationCodeCreateAccount();
    passcodeUtils.generatePasscode(createAccountPage.getNewEmail(), resetPasswordPage.getVerificationcodeText());
    resetPasswordPage.clickOnVerfiyCodeButton();
    createAccountPage.enterNewPassword(config.password);
    createAccountPage.reenterNewPassword(config.password);
    createAccountPage.acceptPrivacyPolicy();
    resetPasswordPage.clickOnCreateOrContinueButton();
});

And(`I login to kidsloop via SSO with a valid user created before`, ()=> {
    loginPage.goToHomePage();
    loginPage.enterEmailAndPassword(createAccountPage.getNewEmail(), config.password);
    loginPage.clickOnLogInButton();
});

Given(`I am on the create account page & I send the code to the new email address`, () => {
    createAccountPage.createNewEmail();
    resetPasswordPage.deleteAllEmail(); // All the emails come to the same account
    loginPage.goToHomePage();
    loginPage.clickOnsignupWithEmail();
    createAccountPage.enterEmailOrPhone(createAccountPage.getNewEmail());
    createAccountPage.clickOnSendVerificationCodeCreateAccount();
    cy.wait(2000).then(() => {
        cy.log(`waited for 2 seconds`);
    });
    passcodeUtils.generatePasscode(createAccountPage.getNewEmail(), resetPasswordPage.getVerificationcodeText());
});

When(`I wait for 5 mins for the code to expire`, () => {
    cy.wait(300010).then(() => {
        cy.log(`wait for 5 mins completed`);
    });
    resetPasswordPage.clickOnVerfiyCodeButton();
    cy.wait(1000).then(() => {
        cy.log(`wait for 1 second completed`);
    });
});

Given(`I enter a new email and click on send verification code`, ()=>{
    createAccountPage.createNewEmail();
    resetPasswordPage.deleteAllEmail(); // All the emails come to the same account
    createAccountPage.enterEmailOrPhone(createAccountPage.getNewEmail());
    createAccountPage.clickOnSendVerificationCodeCreateAccount();
});

And(`I click on send code again button`, ()=> {
    resetPasswordPage.deleteAllEmail(); // All the emails come to the same account
    cy.wait(1000).then(() => {
        cy.log(`waited for 2 seconds`);
    });
    createAccountPage.clickOnSendCodeAgainButton();
});

When(`I enter the new verification code`, () => {
    passcodeUtils.generatePasscode(createAccountPage.getNewEmail(), resetPasswordPage.getVerificationcodeText());
    resetPasswordPage.clickOnVerfiyCodeButton();
});

And(`I enter the password and click on Create Account`, () => {
    cy.wait(1000).then(() => {
        cy.log(`waited for 2 seconds`);
    });
    createAccountPage.enterNewPassword(config.password);
    createAccountPage.enterConfirmNewPassword(config.password);
    createAccountPage.acceptPrivacyPolicy();
    resetPasswordPage.clickOnCreateOrContinueButton();
});

And(`I enter the password and confirm password and click on Create Account`, () => {
    cy.wait(1000).then(() => {
        cy.log(`waited for 2 seconds`);
    });
    createAccountPage.enterNewPassword(config.password);
    createAccountPage.enterConfirmNewPassword(config.password);
    createAccountPage.acceptPrivacyPolicy();
    resetPasswordPage.clickOnCreateOrContinueButton();
});

Given(`I am on the kidsloop create account page`, () => {
    loginPage.goToHomePage();
    loginPage.clickOnsignupWithEmail();
});

When(`I enter an existing account phone number as a new account phone number`, () => {
    resetPasswordPage.deleteAllEmail(); // All the emails come to the same account
    createAccountPage.selectCountry(`United States(+1)`);
    createAccountPage.enterPhonenumber(config.mailosaurPhoneNumber.substring(1));
});

And(`I enter the code`, ()=>{
    passcodeUtils.generatePasscode(createAccountPage.getNewEmail(), resetPasswordPage.getVerificationcodeText());
});

When(`I enter an existing email address as the new email address`, () => {
    resetPasswordPage.deleteAllEmail(); // All the emails come to the same account
    createAccountPage.enterEmailOrPhone(config.duplicateAccountEmailAddress);
});

When(`I click on send code and verify the code`, () => {
    createAccountPage.clickOnSendVerificationCodeCreateAccount();
    passcodeUtils.generatePasscode(config.duplicateAccountEmailAddress, resetPasswordPage.getVerificationcodeText());
    resetPasswordPage.clickOnVerfiyCodeButton();
});

When(`I should see duplicate account error {string}`, (errorText: string) => {
    createAccountPage.checkDuplicateAccountError(errorText);
});

Then(`I should see an error on kidsloop page {string}`, (errorText: string) => {
    createAccountPage.checkGenericError(errorText);
});

Then(`I should see code expired error {string}`, (errorText: string) => {
    createAccountPage.checkCodeExpiredError(errorText);
});

When(`I enter invalid format email address as {string}`, (emailaddress: string) => {
    createAccountPage.enterEmailOrPhone(emailaddress);
    createAccountPage.clickOnSendVerificationCodeCreateAccount();
});

Then(`I should see an error on the Email box as {string}`, (errorText: string) => {
    createAccountPage.checkErrorOnEmail(errorText);
});

Then(`I should see an error on the password box as {string}`, (errorText: string)=> {
    createAccountPage.checkErrorOnPassword(errorText);
});

Then(`I should see an error above the policy box {string}`, (errorText: string) => {
    createAccountPage.checkPrivacyPolicyError(errorText);
});

When(`I click on Log in link`, () => {
    createAccountPage.clickOnLoginLink();
});