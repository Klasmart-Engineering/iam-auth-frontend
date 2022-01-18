import config from "../../configs/config";

class CreateAccountPage {
    createButton = `#continue`;
    newPassword = `#newPassword`;
    reenterPassword = `#reenterPassword`;
    sendCodeCreateAccount = `#emailControl_but_send_code`;
    sendCodeCreateAccountPhone = `#phoneVerificationControl_but_send_code`;
    sendCodeResetPassword = `#emailVerificationControl_but_send_code`;
    sendVerificationCodePhone = `#phoneVerificationControl_but_send_code`;
    privacyPolicy =  `#hasAcceptedPrivacyPolicy_true`;
    verificationcodeText = `#emailVerificationCode`;
    verifyCodeButton = `#emailVerificationControl_but_verify_code`;
    countryCodeSelector = `#countryCode`;
    verifyCodeButtonPhone = `#phoneVerificationControl_but_verify_code`;
    sendVerificationCodeAgainEmail = `#emailControl_but_send_new_code`;
    phoneNumber = `#nationalNumber`;
    verificationCodeInput = `#verificationCode`;
    emailGenericErrorText = `#claimVerificationServerError`;
    codeExpiredErrorText = `#emailControl_error_message`;
    emailOrPhoneFieLd = `#email`;
    genericErrorText = `#fieldIncorrect`; //Phone number create email page
    privacyPolicyError = `#attributeList > ul > li.CheckboxMultiSelect.hasAcceptedPrivacyPolicy_li > div > div`;
    privacyPolicyLink = `#true_option > a`;
    errorOnEmailBox = `.email_li > .attrEntry > .error`;
    errorOnPasswordBox = `.Password > .attrEntry > .error`;

    newEmail = ``;

    enterNewPassword (password: string) {
        cy.wait(2000).then(() => {
            cy.log(`waited for 2 seconds`);
        });
        cy.get(this.newPassword)
            .should(`be.visible`)
            .type(password);
    }

    enterConfirmNewPassword (password: string) {
        cy.get(this.reenterPassword)
            .should(`be.visible`)
            .type(password);
    }

    getVerificationCodeInput (){
        return this.verificationCodeInput;
    }

    enterPhonenumber (pn: string){
        cy.get(this.phoneNumber)
            .should(`be.visible`)
            .type(pn);
    }

    enterEmailOrPhone (emailOrPhone: string) {
        cy.get(this.emailOrPhoneFieLd)
            .should(`be.visible`)
            .type(emailOrPhone);
    }

    pressEnter () {
        cy.type(`{enter}`);
    }

    selectCountry (string: string) {
        cy.get(this.countryCodeSelector)
            .should(`be.visible`)
            .select(string);
    }
    getNewEmail () {
        return this.newEmail;
    }

    createNewEmail () {
        const uniqueTimestamp = Date.now();
        this.newEmail = `automation${uniqueTimestamp}@${config.mailosaurServerId}.mailosaur.net` ;
        cy.log(this.newEmail);
    }

    reenterNewPassword (password: string) {
        cy.get(this.reenterPassword)
            .should(`be.visible`)
            .type(password)
            .type(`{enter}`);

    }

    clickOnVerfiyCodeButtonPhone (){
        cy.get(this.verifyCodeButtonPhone)
            .should(`be.visible`)
            .click({
                force: true,
            });
    }

    clickOnVerfiyCodeButtonEmail (){
        cy.get(this.verifyCodeButton)
            .should(`be.visible`)
            .click({
                force: true,
            });
    }

    enterCode (code: string) {
        cy.get(this.verificationcodeText)
            .should(`be.visible`)
            .type(code);
    }

    acceptPrivacyPolicy () {
        cy.get(this.privacyPolicy).check({
            force: true,
        });
    }

    clickOnCreateButtonCAP () {
        cy.wait(2000).then(() => {
            cy.log(`waited for 2 seconds`);
        });
        cy.get(this.createButton).click({
            force: true,
        });
    }

    clickOnSendVerificationCodeCreateAccount () {
        cy.get(this.sendCodeCreateAccount).should(`be.visible`).click({
            force: true,
        });
    }

    clickOnSendVerificationCodeCreateAccountPhone () {
        cy.get(this.sendCodeCreateAccountPhone).should(`be.visible`).click({
            force: true,
        });
    }

    clickOnSendVerificationCodePhone () {
        cy.get(this.sendVerificationCodePhone).click({
            force: true,
        });
    }
    clickOnSendCodeAgainButton (){
        cy.get(this.sendVerificationCodeAgainEmail).click({
            force: true,
        });

    }

    checkErrorOnEmail (errorText: string) {
        cy.wait(1000).then(() => {
            cy.log(`waited for 1 seconds`);
        });
        cy.get(this.errorOnEmailBox).should(`have.text`, errorText);
    }

    checkErrorOnPassword (errorText: string) {
        cy.wait(1000).then(() => {
            cy.log(`waited for 1 seconds`);
        });
        cy.get(this.errorOnPasswordBox).contains(errorText);
    }

    checkDuplicateAccountError (errorText: any) {
        cy.wait(1000).then(() => {
            cy.log(`waited for 1 seconds`);
        });
        cy.get(this.emailGenericErrorText).should(`have.text`, errorText);
    }

    checkCodeExpiredError (errorText: string) {
        cy.wait(1000).then(() => {
            cy.log(`waited for 1 seconds`);
        });
        cy.get(this.codeExpiredErrorText).should(`have.text`, errorText);
    }

    checkGenericError (errorText: string) {
        cy.wait(2000).then(() => {
            cy.log(`waited for 1 seconds`);
        });
        cy.contains(errorText).should(`be.visible`);
    }

    checkPrivacyPolicyError (errorText: string){
        cy.wait(1000).then(() => {
            cy.log(`waited for 1 seconds`);
        });
        cy.get(this.privacyPolicyError).should(`have.text`, errorText);

    }
}

export const createAccountPage = new CreateAccountPage();
