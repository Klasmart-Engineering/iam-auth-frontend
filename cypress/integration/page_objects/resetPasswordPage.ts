import config from "../../configs/config";

class ResetPasswordPage {
    createOrContinueButton = `#continue`;
    newPassword = `#newPassword`;
    reenterPassword = `#reenterPassword`;
    sendCodeCreateAccount = `#emailVerificationControl_but_send_code`;
    privacyPolicy =  `#extension_HasAcceptedPrivacyPolicy_true`;
    verificationcodeText = `#verificationCode`;
    verificationcodeTextResetPasswordPage = `#emailVerificationCode`;
    verifyCodeButton = `#emailControl_but_verify_code`;
    verifyCodeButtonResetPassword = `#emailVerificationControl_but_verify_code`;
    verifyCodeButtonPhoneNumber = `#phoneVerificationControl_but_verify_code`;
    emailInput = `#email`;
    errorText = `#emailControl_error_message`;
    claimVerificationError = `#claimVerificationServerError`;
    verificationFailedError = `#emailVerificationControl_error_message`;
    testEmail = `something@${Cypress.env(`mailosaurServerId`)}.mailosaur.net`;
    passcode = `0`;
    sendCodeBtn = `#emailControl_but_send_code`;
    sendCodeBtnPhone = `#phoneVerificationControl_but_send_code`;
    newPasswordValue = `ABcd1234`
    sendNewCodeButton = `#emailControl_but_send_new_code`;
    sendNewCodeButtonPhoneNumber = `#phoneVerificationControl_but_send_new_code`;
    latestPasscode = `0`;

    setNewPassword () {
        this.newPasswordValue = `A0m` + Math.random().toString(36).slice(2);
    }

    setLatestPasscodeValue (pvalue: string){
        this.latestPasscode= pvalue;
    }

    getNewPasswordValue () {
        return this.newPasswordValue;
    }

    getTestEmail () {
        return this.testEmail;
    }

    getVerificationcodeText (){
        return this.verificationcodeText;
    }

    getErrorTextEle () {
        cy.wait(1000).then(() => {
            cy.log(`waited for 1 seconds`);
        });
        return cy.get(this.errorText).should(`be.visible`);
    }
    getclaimVerificationErrorTextEle () {
        return cy.get(this.claimVerificationError);
    }

    getVerificationFailedErrorTextEle () {
        return cy.get(this.verificationFailedError);
    }

    enterCode (number: string) {
        cy.get(this.verificationcodeText)
            .should(`be.visible`).clear()
            .type(number);
    }

    enterNewPassword (password: string) {
        cy.get(this.newPassword)
            .should(`be.visible`)
            .type(password)
            .type(`{enter}`);
    }

    reenterNewPassword (password: string) {
        cy.get(this.reenterPassword)
            .should(`be.visible`)
            .type(password)
            .type(`{enter}`);
    }

    acceptPrivacyPolicy () {
        cy.get(this.privacyPolicy).check({
            force: true,
        });
    }

    clickOnCreateOrContinueButton () {
        cy.wait(2000).then(() => {
            cy.log(`waited for 1 seconds`);
        });
        cy.get(this.createOrContinueButton).should('exist').click({
            force: true,
        });
    }

    clickOnSendNewCodeButtonPhoneNumber () {
        cy.get(this.sendNewCodeButtonPhoneNumber).should(`exist`).click({
            force: true,
        });
        cy.wait(1000).then(() => {
            cy.log(`waited for 1 seconds`);
        });
    }

    clickOnSendNewCodeButton () {
        cy.get(this.sendNewCodeButton).should(`exist`).click({
            force: true,
        });
        cy.wait(1000).then(() => {
            cy.log(`waited for 1 seconds`);
        });
    }

    clickOnVerfiyCodeButton () {
        cy.get(this.verifyCodeButton).should(`exist`).click({
            force: true,
        });
        cy.wait(1000).then(() => {
            cy.log(`waited for 1 seconds`);
        });
    }
    clickOnVerfiyCodeButtonForPhoneNumber () {
        cy.get(this.verifyCodeButtonPhoneNumber).should(`exist`).click({
            force: true,
        });
        cy.wait(1000).then(() => {
            cy.log(`waited for 1 seconds`);
        });
    }
    clickOnSendVerificationCodeCreateAccount () {
        cy.get(this.sendCodeCreateAccount).click({
            force: true,
        });
    }
    clickOnSendCodeButton () {
        cy.get(this.sendCodeBtn).should(`be.visible`).click({
            force: true,
        });
        cy.wait(2000).then(() => {
            cy.log(`waited for 1 seconds`);
        });
    }

    clickOnSendCodeButtonOnPhoneNumber () {
        cy.get(this.sendCodeBtnPhone).should(`be.visible`).click({
            force: true,
        });
        cy.wait(2000).then(() => {
            cy.log(`waited for 1 seconds`);
        });
    }

    enterEmail (email: string) {
        cy.get(this.emailInput).type(email);
    }

    setPasscode (passcode: string) {
        this.passcode = passcode;
    }

    deleteAllEmail () {
        cy.mailosaurDeleteAllMessages(Cypress.env(`mailosaurServerId`));
    }
}

export const resetPasswordPage = new ResetPasswordPage();
