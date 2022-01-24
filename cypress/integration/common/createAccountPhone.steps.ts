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

Given(`I create a new account with a new phone number {string}`, (phonenumber: string)=> {
    loginPage.goToHomePage();
    loginPage.clickOnsignupWithPhone();
    resetPasswordPage.deleteAllEmail(); // All the emails come to the same account
    createAccountPage.selectCountry(`United States(+1)`);
    createAccountPage.enterPhonenumber(phonenumber);
    createAccountPage.clickOnSendVerificationCodePhone();
    const phonenumber1 = `1` + phonenumber;
    passcodeUtils.generatePasscodeFromSMS(phonenumber1, createAccountPage.getVerificationCodeInput());
    createAccountPage.clickOnVerfiyCodeButtonPhone();
    cy.wait(1000).then(() => {
        cy.log(`waited for 1 seconds`);
    });
    createAccountPage.enterNewPassword(config.password);
    createAccountPage.reenterNewPassword(config.password);
    createAccountPage.acceptPrivacyPolicy();
});

When(`I select a country as {string}`, (country)=> {
    if(country==`US`)
        createAccountPage.selectCountry(`United States(+1)`);
});

Given(`I am on the kidsloop create account with phone number page`, ()=> {
    loginPage.goToHomePage();
    loginPage.clickOnsignupWithPhone();
});

When(`I click on send code for phone and verify the code`, () => {
    createAccountPage.clickOnSendVerificationCodeCreateAccountPhone();
    cy.wait(1000).then(() => {
        cy.log(`waited for 2 seconds`);
    });
    passcodeUtils.generatePasscodeFromSMS(config.mailosaurPhoneNumber, resetPasswordPage.getVerificationcodeText());
    createAccountPage.clickOnVerfiyCodeButtonPhone();
});

When(`I click on send code for phone`, ()=> {
    createAccountPage.clickOnSendVerificationCodeCreateAccountPhone();
    cy.wait(1000).then(() => {
        cy.log(`waited for 2 seconds`);
    });
});

When(`I enter password on create account with phone number page as {string}`, (password: string) => {
    createAccountPage.enterNewPassword(password);
    createAccountPage.clickOnCreateButtonCAP();
});

When(`I enter the phone number as {string}`, (phoneno) => {
    createAccountPage.enterPhonenumber(phoneno);
});

Then(`I should see the verify code button`, ()=> {
    createAccountPage.checkVerfiyCodeButtonPhoneVisible();
});
