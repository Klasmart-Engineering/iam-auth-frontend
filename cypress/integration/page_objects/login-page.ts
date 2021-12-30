class LoginPage {
    selectYourCountryText = '.MuiTypography-root.MuiTypography-h5';
    countryList =
        '.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock';
    emailOrPhoneFieLd = '#signInName';
    passwordField = '#password';
    logInButton = '#next';
    privacyPolicyCheckBox = '#privacy-policy';
    clickHereLink =
        "div[class='MuiListItemText-root'] span[class='MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock']";
    continueButton = "[type='submit']";
    nonExistingAccountError = '.error.pageLevel';
    privacyPolicyError = '#privacy-policy__error';
    selectProfile = '.MuiList-root > :nth-child(1) > .MuiListItem-root';
    invalidEmailError = '#localAccountForm > div.entry > div:nth-child(1) > div > p';
    invalidLoginError = '.pageLevel > p';
    createAccountLink = '#createAccount';
    forgetPassword = '#forgotPassword';
    signupWithPhone = '#SignupWithPhone';
    signupWithEmail = '#SignupWithEmail';


    getSelectYourCountryOrRegionText() {
        return cy.get(this.selectYourCountryText).should('be.visible');
    }
    
    goToHomePage(){
       cy.removeCookies();
       cy.visit('/signin');
    }

    clickOnSignUp(){
        cy.get(this.createAccountLink).should('be.visible').click();
    }

    clickOnsignupWithEmail() {
        cy.get(this.signupWithEmail).should('be.visible').click();
    }

    clickOnsignupWithPhone() {
        cy.get(this.signupWithPhone).should('be.visible').click();
    }
    
    clickOnProfile() {
        cy.get(this.selectProfile).should('be.visible').click();
    }
    clickHere() {
        cy.get(this.clickHereLink).should('be.visible').click();
    }

    clickForgetPasswordLink() {
        cy.get(this.forgetPassword).should('be.visible').click();
    }

    acceptPrivacyPolicy() {
        cy.get(this.privacyPolicyCheckBox).check({ force: true });
    }

    clickOnCreateButton() {
        cy.get(this.createButton).check({ force: true });

    }

    enterEmailOrPhone(emailOrPhone) {
        cy.get(this.emailOrPhoneFieLd)
            .should('be.visible')
            .type(emailOrPhone);
         //   .type('{enter}');
    }

    enterPassword(password) {
        cy.get(this.passwordField)
            .should('be.visible')
            .type(password);
           // .type('{enter}');
    }

    clickOnLogInButton() {
        cy.get(this.logInButton).should('be.visible').click({ force: true });
    }

    enterEmailAndPassword(emailOrPassword, password) {
        cy.get(this.emailOrPhoneFieLd)
            .should('be.visible')
            .type(emailOrPassword)
            .type('{enter}');
        cy.get(this.passwordField)
            .should('be.visible')
            .type(password)
            .type('{enter}');
    }

    clickOnContinueButton() {
        cy.get(this.continueButton).then(($button) => {
            if ($button.is(':visible')) {
                cy.get(this.continueButton).click({ force: true });
            }
        });
    }

    getInvalidEmailError() {
        return cy.get(this.invalidEmailError).should('be.visible');
    }

    getInvalidLoginError() {
        return cy.get(this.invalidLoginError).should('be.visible');
    }

    getNonExistingAccountErrorMessage() {
        return cy.get(this.nonExistingAccountError).should('be.visible');
    }

    getPrivacyPolicyErrorMessage() {
        return cy.get(this.privacyPolicyError).should('be.visible');
    }

    checkURL() {
        return cy.url().should('include', 'auth.sso.kidsloop.live/')
    }
}

export const loginPage = new LoginPage();
