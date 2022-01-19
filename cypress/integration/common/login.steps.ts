import config from '../../configs/config';
import languageCodes from '../../configs/languageCodes';
import { loginPage } from '../page_objects/loginPage';
import {
    And,
    Given,
    Then,
    When,
} from "cypress-cucumber-preprocessor/steps";

Given(`I login to kidsloop via SSO with a valid user {string}`, (email: string) => {
    loginPage.goToHomePage();
    loginPage.enterEmailAndPassword(email, config.password);
    loginPage.clickOnLogInButton();
});

Given(`I am on the kidsloop login page`, () => {
    loginPage.goToHomePage();
});

And(`I click on login button`, ()=> {
    loginPage.clickOnLogInButton();
});
When(`I enter invalid email as {string}`, (text: string) => {
    loginPage.enterEmailOrPhone(text);
});

When(`I enter invalid email for logging in as {string}`, (email: string) => {
    loginPage.enterEmailOrPhone(email);
});

When(`I enter the password and login`, ()=> {
    loginPage.enterPassword(config.password);
    loginPage.clickOnLogInButton();
});

When(`I should see an invalid email error {string}`, (errorText: string) => {
    loginPage.getInvalidEmailError().should(`contain`, errorText);
});

And(`I enter a valid email {string}`, (email: string) => {
    loginPage.enterEmailOrPhone(email);

});

When(`I enter wrong password`, ()=> {
    loginPage.enterPassword(`xyz`);
    loginPage.clickOnLogInButton();
});

When(`I enter password as {string}`, (password: string) => {
    loginPage.enterPassword(password);
});

Then(`I should see an invalid login error {string}`, (errorText: string)=>{
    loginPage.getInvalidLoginError().should(`have.text`, errorText);
});

Given(`I login to kidsloop via SSO with phone number {string}`, (phone: string)=> {
    loginPage.goToHomePage();
    loginPage.enterEmailAndPassword(phone, config.password);
    loginPage.clickOnLogInButton();
});

Then(`I select the first profile from the list`, () => {
    loginPage.clickOnProfile();
    loginPage.clickOnContinueButton();
});

Then(`the default language selected should be {string}`, (languageText)=> {
    const selectorText = languageCodes.languageSelectorText.get(languageText);
    if (!selectorText) {
        throw new Error(`Language selector ${languageText} not found`);
    }
    loginPage.verifyLanguageSelector(selectorText);
});
