import languageCodes from "../../configs/languageCodes";

class LoginPage {
    selectYourCountryText = `.MuiTypography-root.MuiTypography-h5`;
    countryList =
        `.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock`;
    emailOrPhoneFieLd = `#signInName`;
    passwordField = `#password`;
    logInButton = `#next`;
    privacyPolicyCheckBox = `#privacy-policy`;
    clickHereLink =
        `#app > div > div > div.MuiPaper-root.MuiCard-root.jss1.MuiPaper-elevation1.MuiPaper-rounded > div > div > div:nth-child(4) > ul > div > div > span`;
    continueButton = `[type='submit']`;
    nonExistingAccountError = `.error.pageLevel`;
    privacyPolicyError = `#privacy-policy__error`;
    selectProfile = `.MuiList-root > :nth-child(1) > .MuiListItem-root`;
    invalidEmailError = `#localAccountForm > div.entry > div:nth-child(1) > div > p`;
    invalidLoginError = `.pageLevel > p`;
    createAccountLink = `#createAccount`;
    forgetPassword = `#forgotPassword`;
    signupWithPhone = `#SignupWithPhone`;
    signupWithEmail = `#SignupWithEmail`;
    languageSelector = `#language-select`;
    creatAccountLinkText = `#localAccountForm > div.claims-provider-list-text-links > p`;
    emailLabelText = `#localAccountForm > div.entry > div:nth-child(1) > label`;
    passwordLabel = `.password-label > label`;
    phoneNumberLoginLink = `#SigninWithPhone`;
    phoneNumberInput = `#nationalNumber`;
    continueButtonOnLogin = `#continue`; 

    getSelectYourCountryOrRegionText () {
        return cy.get(this.selectYourCountryText).should(`be.visible`);
    }

    goToHomePage (){
        cy.visit(`signin`);
    }

    clickOnSignUp (){
        cy.get(this.createAccountLink).should(`be.visible`).click();
    }

    clickContinue (){
        cy.get(this.continueButtonOnLogin).should(`be.visible`).click();
    }

    clickOnsignupWithEmail () {
        cy.get(this.signupWithEmail).should(`be.visible`).click();
    }

    clickOnsignupWithPhone () {
        cy.get(this.signupWithPhone).should(`be.visible`).click();
    }

    clickOnProfile () {
        cy.get(this.selectProfile).should(`be.visible`).click();
    }

    verifyClickHere () {
        cy.get(this.clickHereLink).should(`be.visible`);
    }

    clickForgetPasswordLink () {
        cy.get(this.forgetPassword).should(`be.visible`).click();
    }

    acceptPrivacyPolicy () {
        cy.get(this.privacyPolicyCheckBox).check({
            force: true,
        });
    }

    enterEmailOrPhone (emailOrPhone: string) {
        cy.get(this.emailOrPhoneFieLd)
            .should(`be.visible`)
            .type(emailOrPhone);
    }
    enterPhone (phone: string) {
        cy.get(this.phoneNumberInput)
        .should(`be.visible`)
        .type(phone);
    }
    enterPassword (password: string) {
        cy.get(this.passwordField)
            .should(`be.visible`)
            .type(password);
    }

    clickOnLogInButton () {
        cy.get(this.logInButton).should(`be.visible`).click({
            force: true,
        });
    }

    enterEmailAndPassword (emailOrPassword: string, password: string) {
        cy.get(this.emailOrPhoneFieLd)
            .should(`be.visible`)
            .type(emailOrPassword)
            .type(`{enter}`);
        cy.get(this.passwordField)
            .should(`be.visible`)
            .type(password)
            .type(`{enter}`);
    }
    clickOnLoginWithPhoneNumberLink () {
        cy.get(this.phoneNumberLoginLink).should(`be.visible`).click();
    }

    clickOnContinueButton () {
        cy.get(this.continueButton).then(($button) => {
            if ($button.is(`:visible`)) {
                cy.get(this.continueButton).click({
                    force: true,
                });
            }
        });
    }

    verifyLanguageSelector (text: string) {
        cy.get(`select${this.languageSelector} option:selected`).should(`have.text`, text);
    }

    getInvalidEmailError () {
        return cy.get(this.invalidEmailError).should(`be.visible`);
    }

    getInvalidLoginError () {
        return cy.get(this.invalidLoginError).should(`be.visible`);
    }

    getNonExistingAccountErrorMessage () {
        return cy.get(this.nonExistingAccountError).should(`be.visible`);
    }

    getPrivacyPolicyErrorMessage () {
        return cy.get(this.privacyPolicyError).should(`be.visible`);
    }

    selectLanguage (languageText: string) {
        cy.get(this.languageSelector).select(languageText);
    }

    checkText (languageText: string){
        cy.get(this.emailLabelText).should(`have.text`, languageCodes.emailAddressOrPhoneNumberText.get(languageText));
        cy.get(this.forgetPassword).should(`have.text`, languageCodes.forgotYourPasswordText.get(languageText));
        cy.get(this.logInButton).should(`have.text`, languageCodes.loginButtonText.get(languageText));
        cy.get(this.passwordLabel).should(`have.text`, languageCodes.passwordText.get(languageText));
    }
}

export const loginPage = new LoginPage();
