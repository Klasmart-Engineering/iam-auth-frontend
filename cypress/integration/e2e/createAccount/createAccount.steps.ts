import { createAccountPage } from "../../page_objects/create-account-page";
import { loginPage } from "../../page_objects/login-page";
import { resetPasswordPage } from "../../page_objects/reset-password-page";
import { util } from "../../utils/Utils";
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
    util.generatePasscode(createAccountPage.getNewEmail(), resetPasswordPage.getVerificationcodeText());
    resetPasswordPage.clickOnVerfiyCodeButton();
    createAccountPage.enterNewPassword(`Abcd1234`);
    // createAccountPage.reenterNewPassword("Abcd1234");
    createAccountPage.acceptPrivacyPolicy();
    resetPasswordPage.clickOnCreateOrContinueButton();
});

Given(`I create a new account with a new phone number {string}`, (phonenumber: string)=> {
    loginPage.goToHomePage();
    loginPage.clickOnsignupWithPhone();
    resetPasswordPage.deleteAllEmail(); // All the emails come to the same account
    createAccountPage.selectCountry(`United States(+1)`);
    createAccountPage.enterPhonenumber(phonenumber);
    createAccountPage.clickOnSendVerificationCodePhone();
    const phonenumber1 = `1` + phonenumber;
    util.generatePasscodeFromSMS(phonenumber1, createAccountPage.getVerificationCodeInput());
    createAccountPage.clickOnVerfiyCodeButtonPhone();
    cy.wait(1000).then((interceptions) => {
        cy.log(`waited for 2 seconds`);
    });
    createAccountPage.enterNewPassword(`Abcd1234`);
    createAccountPage.reenterNewPassword(`Abcd1234`);
    createAccountPage.acceptPrivacyPolicy();
    // resetPasswordPage.clickOnCreateOrContinueButton();
});

Given(`I am on the create account page & I send the code to the new email address`, () => {
    createAccountPage.createNewEmail();
    resetPasswordPage.deleteAllEmail(); // All the emails come to the same account
    loginPage.goToHomePage();
    loginPage.clickOnsignupWithEmail();
    createAccountPage.enterEmailOrPhone(createAccountPage.getNewEmail());
    createAccountPage.clickOnSendVerificationCodeCreateAccount();
    cy.wait(2000).then((interceptions) => {
        cy.log(`waited for 2 seconds`);
    });
    util.generatePasscode(createAccountPage.getNewEmail(), resetPasswordPage.getVerificationcodeText());
});

When(`I wait for 5 mins for the code to expire`, () => {
    cy.wait(300010).then((interceptions) => {
        cy.log(`wait for 5 mins completed`);
    });
    resetPasswordPage.clickOnVerfiyCodeButton();
    cy.wait(1000).then((interceptions) => {
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
    util.generatePasscode(createAccountPage.getNewEmail(), resetPasswordPage.getVerificationcodeText());
    resetPasswordPage.clickOnVerfiyCodeButton();
});

And(`I enter the password and click on Create Account`, () => {
    cy.wait(1000).then(() => {
        cy.log(`waited for 2 seconds`);
    });
    createAccountPage.enterNewPassword(`Abcd1234`);
    //createAccountPage.enterConfirmNewPassword(`Abcd1234`);
    createAccountPage.acceptPrivacyPolicy();
    resetPasswordPage.clickOnCreateOrContinueButton();
});

And(`I enter the password and confirm password and click on Create Account`, () => {
    cy.wait(1000).then(() => {
        cy.log(`waited for 2 seconds`);
    });
    createAccountPage.enterNewPassword(`Abcd1234`);
    createAccountPage.enterConfirmNewPassword(`Abcd1234`);
    createAccountPage.acceptPrivacyPolicy();
    resetPasswordPage.clickOnCreateOrContinueButton();
});

When(`I am on the kidsloop create account page`, () => {
    loginPage.goToHomePage();
    loginPage.clickOnsignupWithEmail();
});

When(`I enter an existing account phone number as a new account phone number`, () => {
    resetPasswordPage.deleteAllEmail(); // All the emails come to the same account
    createAccountPage.selectCountry(`United States(+1)`);
    createAccountPage.enterPhonenumber(`2692304118`);
});

When(`I am on the kidsloop create account with phone number page`, ()=> {
    loginPage.goToHomePage();
    loginPage.clickOnsignupWithPhone();
});
And(`I enter the code`, ()=>{
    util.generatePasscode(createAccountPage.getNewEmail(), resetPasswordPage.getVerificationcodeText());
});

When(`I enter an existing email address as the new email address`, () => {
    resetPasswordPage.deleteAllEmail(); // All the emails come to the same account
    createAccountPage.enterEmailOrPhone(`automation1640094816650@zw6ahich.mailosaur.net`);
});

When(`I click on send code for phone and verify the code`, () => {
    createAccountPage.clickOnSendVerificationCodeCreateAccountPhone();
    cy.wait(1000).then((interceptions) => {
        cy.log(`waited for 2 seconds`);
    });
    util.generatePasscodeFromSMS(`12692304118`, resetPasswordPage.getVerificationcodeText());
    createAccountPage.clickOnVerfiyCodeButtonPhone();
});

When(`I click on send code and verify the code`, () => {
    createAccountPage.clickOnSendVerificationCodeCreateAccount();
    util.generatePasscode(`automation1640094816650@zw6ahich.mailosaur.net`, resetPasswordPage.getVerificationcodeText());
    resetPasswordPage.clickOnVerfiyCodeButton();
});

When(`I should see duplicate account error {string}`, (errorText: any) => {
    createAccountPage.checkDuplicateAccountError(errorText);
});

When(`I should an error on create account page {string}`, (errorText: any) => {
    //cy.find(errorText).should(`exist`);
    createAccountPage.checkDuplicateAccountError(errorText);
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

When(`I enter password on create account with phone number page as {string}`, (password: string) => {
    createAccountPage.enterNewPassword(password);
    createAccountPage.clickOnCreateButtonCAP();
});
