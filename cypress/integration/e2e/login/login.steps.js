import { Given,And, When } from "cypress-cucumber-preprocessor/steps";
import { loginPage } from '../../page_objects/login-page';

Given("I login to kidsloop via SSO with a valid user {string}", (email) => {
  loginPage.goToHomePage();
  loginPage.enterEmailAndPassword(email,"Abcd1234");
  loginPage.clickOnLogInButton();
 // signInPage.clickOnProfile();
 // signInPage.clickOnContinueButton();
});

Given("I am on the kidsloop login page", () => {
   loginPage.goToHomePage();
  //cy.navigateToHomePage();
});

And("I click on login button", ()=> {
  loginPage.clickOnLogInButton();
});
When("I enter invalid email as {string}", (text) => {
   loginPage.enterEmailOrPhone(text);
})

When("I enter invalid email for logging in as {string}", (email) => {
  loginPage.enterEmailOrPhone(email);
});

When("I enter the password and login", ()=> {
  loginPage.enterPassword("Abcd1234");
  loginPage.clickOnLogInButton();
});

When("I should see an invalid email error {string}", (errorText) => {
  loginPage.getInvalidEmailError().should('have.text',errorText);
});

And("I enter a valid email {string}", (email) => {
  loginPage.enterEmailOrPhone(email);

});

When("I enter wrong password", ()=> {
  loginPage.enterPassword("xyz");
  loginPage.clickOnLogInButton();
});

When("I enter password as {string}", (password) => {
  loginPage.enterPassword(password);
});

Then("I should see an invalid login error {string}",(errorText)=>{
  loginPage.getInvalidLoginError().should('have.text',errorText);
});

Given("I login to kidsloop via SSO with phone number {string}" , (phone)=> {
  loginPage.goToHomePage();
  //cy.navigateToHomePage();
  loginPage.enterEmailAndPassword(phone,"Abcd1234");
  loginPage.clickOnLogInButton();
});

Then("I select the first profile from the list", () => {
    loginPage.clickOnProfile();
    loginPage.clickOnContinueButton();
});