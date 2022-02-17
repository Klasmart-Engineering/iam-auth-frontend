
import languageCodes from "../../configs/languageCodes";
import { homePage } from "../page_objects/homePage";
import { loginPage } from "../page_objects/loginPage";
import {
    And,
    Given,
    Then,
    When,
} from "cypress-cucumber-preprocessor/steps";

When(`I set the locale cookie to {string}`, (languageText)=> {
    cy.wait(1000).then(() => {
        cy.log(`waited for 1 seconds`);
    });
    cy.clearCookies();
    cy.wait(1000).then(() => {
        cy.log(`waited for 1 seconds`);
    });
    cy.log(`setting locale to ` + languageText);
    const code = languageCodes.languageCodes.get(languageText);
    if (!code) {
        throw new Error(`Language ${languageText} not found`);
    }
    cy.setCookie(`locale`, code);
    cy.wait(2000).then(() => {
        cy.log(`waited for 2 seconds`);
    });
});

Given(`I verify the text on {string} is displayed in {string}`, (page: string, language: string) => {
    if(page == `LoginPage`){
        loginPage.checkText(language);
    }
});

When(`I select the language selector to {string}`, (language: string) => {
    loginPage.selectLanguage(language);
});

Then(`the default language selected should be {string}`, (languageText)=> {
    const selectorText = languageCodes.languageSelectorText.get(languageText);
    if (!selectorText) {
        throw new Error(`Language selector ${languageText} not found`);
    }
    loginPage.verifyLanguageSelector(selectorText);
});
