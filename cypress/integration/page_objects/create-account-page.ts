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
    errorText = `#claimVerificationServerError`;
    codeExpiredErrorText = `#emailControl_error_message`;
    serverId = `zw6ahich`;
    emailOrPhoneFieLd = `#email`;

    errorOnEmailBox = `.email_li > .attrEntry > .error`;
    errorOnPasswordBox = `.Password > .attrEntry > .error`;

    newEmail = ``;

    enterNewPassword (password: string) {
        cy.get(this.newPassword)
            .should(`be.visible`)
            .type(password);
        // .type('{enter}');
    }

    enterConfirmNewPassword (password: string) {
        cy.get(this.reenterPassword)
            .should(`be.visible`)
            .type(password);
        // .type('{enter}');
    }

    getVerificationCodeInput (){
        return this.verificationCodeInput;
    }

    enterPhonenumber (pn: string){
        cy.get(this.phoneNumber)
            .should(`be.visible`)
            .type(pn);
        //.type('{enter}');
    }

    enterEmailOrPhone (emailOrPhone: string) {
        cy.get(this.emailOrPhoneFieLd)
            .should(`be.visible`)
            .type(emailOrPhone);
        //   .type('{enter}');
    }

    pressEnter () {
        cy.type(`{enter}`);
    }

    selectCountry (string: string | number | (string | number)[]) {
        cy.get(this.countryCodeSelector)
            .should(`be.visible`)
            .select(string);
    }
    getNewEmail () {
        return this.newEmail;
    }

    createNewEmail () {
        const uniqueTimestamp = Date.now();
        this.newEmail = `automation${uniqueTimestamp}@${this.serverId}.mailosaur.net` ;
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
        //cy.wait(2000);
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

    checkErrorOnEmail (errorText: any) {
        cy.get(this.errorOnEmailBox).should(`be.visible`).should(`have.text`, errorText);
    }

    checkErrorOnPassword (errorText: string | number | RegExp) {
        cy.get(this.errorOnPasswordBox).should(`be.visible`).contains(errorText);
    }

    checkDuplicateAccountError (errorText: any) {
        cy.get(this.errorText).should(`be.visible`).should(`have.text`, errorText);
    }
}

export const createAccountPage = new CreateAccountPage();
