import { createAccountPage } from "../../page_objects/create-account-page";
import { When, Given, Then, And } from "cypress-cucumber-preprocessor/steps";
import { loginPage } from "../../page_objects/login-page";
import {resetPasswordPage} from "../../page_objects/reset-password-page"
import { util } from "../../utils/Utils";

When("I create a new account with a new email address" , ()=> {
  createAccountPage.createNewEmail();
  resetPasswordPage.deleteAllEmail(); // All the emails come to the same account 
  loginPage.goToHomePage();
  loginPage.clickOnsignupWithEmail();
  createAccountPage.enterEmailOrPhone(createAccountPage.getNewEmail());
  createAccountPage.clickOnSendVerificationCodeCreateAccount();
  util.generatePasscode(createAccountPage.getNewEmail(),resetPasswordPage.getVerificationcodeText());
  resetPasswordPage.clickOnVerfiyCodeButton();
  cy.wait(1000);
  createAccountPage.enterNewPassword("Abcd1234");
 // createAccountPage.reenterNewPassword("Abcd1234");
  createAccountPage.acceptPrivacyPolicy();
  resetPasswordPage.clickOnCreateOrContinueButton();
});

Given("I create a new account with a new phone number {string}", (phonenumber)=> {
  loginPage.goToHomePage();
  loginPage.clickOnsignupWithPhone();
  resetPasswordPage.deleteAllEmail(); // All the emails come to the same account 
  createAccountPage.selectCountry("United States(+1)");
  createAccountPage.enterPhonenumber(phonenumber); 
  createAccountPage.clickOnSendVerificationCodePhone();
  var phonenumber1 = "1" + phonenumber;
  util.generatePasscodeFromSMS(phonenumber1,createAccountPage.getVerificationCodeInput());
  createAccountPage.clickOnVerfiyCodeButtonPhone();
  cy.wait(1000);
  createAccountPage.enterNewPassword("Abcd1234");
  createAccountPage.reenterNewPassword("Abcd1234");
  createAccountPage.acceptPrivacyPolicy();
 // resetPasswordPage.clickOnCreateOrContinueButton();
});

Given("I am on the create account page & I send the code to the new email address" , () => {
  createAccountPage.createNewEmail();
  resetPasswordPage.deleteAllEmail(); // All the emails come to the same account 
  loginPage.goToHomePage();
  loginPage.clickOnsignupWithEmail();
  createAccountPage.enterEmailOrPhone(createAccountPage.getNewEmail());
  createAccountPage.clickOnSendVerificationCodeCreateAccount();
  cy.wait(2000);
  util.generatePasscode(createAccountPage.getNewEmail(),resetPasswordPage.getVerificationcodeText());
});

When("I wait for 5 mins for the code to expire", () => {
  cy.wait(300010);
  resetPasswordPage.clickOnVerfiyCodeButton();
  cy.wait(1000);
});

Given("I enter a new email and click on send verification code", ()=>{
  createAccountPage.createNewEmail();
  resetPasswordPage.deleteAllEmail(); // All the emails come to the same account 
  createAccountPage.enterEmailOrPhone(createAccountPage.getNewEmail());
  createAccountPage.clickOnSendVerificationCodeCreateAccount();
});

And("I click on send code again button", ()=> {
  resetPasswordPage.deleteAllEmail(); // All the emails come to the same account 
  cy.wait(1000);
  createAccountPage.clickOnSendCodeAgainButton();
});

When("I enter the new verification code", () => {
  
  util.generatePasscode(createAccountPage.getNewEmail(),resetPasswordPage.getVerificationcodeText());
  resetPasswordPage.clickOnVerfiyCodeButton();
});

And("I enter the password and click on Create Account", () => {
  cy.wait(1000);
  createAccountPage.enterNewPassword("Abcd1234");
  createAccountPage.acceptPrivacyPolicy();
  resetPasswordPage.clickOnCreateOrContinueButton();
});

When("I am on the kidsloop create account page", () => {
  loginPage.goToHomePage();
  loginPage.clickOnsignupWithEmail();
});

And("I enter the code", ()=>{
  util.generatePasscode(createAccountPage.getNewEmail(),resetPasswordPage.getVerificationcodeText());
});

When("I enter an existing email address as the new email address", () => {
  resetPasswordPage.deleteAllEmail(); // All the emails come to the same account 
  createAccountPage.enterEmailOrPhone("automation1640094816650@zw6ahich.mailosaur.net");
});

When("I click on send code and verify the code", () => {
  createAccountPage.clickOnSendVerificationCodeCreateAccount();
  util.generatePasscode("automation1640094816650@zw6ahich.mailosaur.net",resetPasswordPage.getVerificationcodeText());
  resetPasswordPage.clickOnVerfiyCodeButton();
});


When("I should see duplicate account error {string}", (errorText) => {
  createAccountPage.checkDuplicateAccountError(errorText);
});

When("I should an error on create account page {string}", (errorText) => {
 // createAccountPage.checkDuplicateAccountError(errorText);
 cy.findByText(errorText).should('be.visible').should("exist");
});


//When("", () => {});



