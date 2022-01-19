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
    emailInput = `#email`;

    errorText = `#emailControl_error_message`;
    claimVerificationError = `#claimVerificationServerError`;
    verificationFailedError = `#emailVerificationControl_error_message`;
    testEmail = `something@${config.mailosaurServerId}.mailosaur.net`;
    passcode = `0`;

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
        cy.wait(1000).then(() => {
            cy.log(`waited for 1 seconds`);
        });
        cy.get(this.createOrContinueButton).click({
            force: true,
        });

    }

    clickOnVerfiyCodeButton () {
        cy.get(this.verifyCodeButton).should(`be.visible`).click({
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

    enterEmail (email: string) {
        cy.get(this.emailInput).type(email);
    }

    setPasscode (passcode: string) {
        this.passcode = passcode;
    }

    deleteAllEmail () {
        cy.mailosaurDeleteAllMessages(config.mailosaurServerId);
    }
}

export const resetPasswordPage = new ResetPasswordPage();
