
class ResetPasswordPage {
    createOrContinueButton = '#continue';
    newPassword = '#newPassword';
    reenterPassword = '#reenterPassword';
    sendCodeCreateAccount = '#emailVerificationControl_but_send_code';
    privacyPolicy =  '#extension_HasAcceptedPrivacyPolicy_true';
    verificationcodeText = '#verificationCode';
    verificationcodeTextResetPasswordPage = '#emailVerificationCode';
    verifyCodeButton = '#emailControl_but_verify_code';
    verifyCodeButtonResetPassword = '#emailVerificationControl_but_verify_code';

    errorText = '#emailControl_error_message';
    claimVerificationError = '#claimVerificationServerError';
    verificationFailedError = '#emailVerificationControl_error_message';

    serverId = 'zw6ahich'; 
    testEmail = `something@${this.serverId}.mailosaur.net`;


    getTestEmail() {
        return this.testEmail;
    }
    
    getVerificationcodeText(){
        return this.verificationcodeText;
    }

    getErrorTextEle() {
       return cy.get(this.errorText);
    }
    getclaimVerificationErrorTextEle() {
        return cy.get(this.claimVerificationError);
     }

     getVerificationFailedErrorTextEle() {
        return cy.get(this.verificationFailedError);
     }

    enterCode(number) {
        cy.get(this.verificationcodeText)
          .should('be.visible').clear()
          .type(number);
    }

    enterNewPassword(password) {
        cy.get(this.newPassword)
        .should('be.visible')
        .type(password)
        .type('{enter}');
    }

    reenterNewPassword(password) {
        cy.get(this.reenterPassword)
        .should('be.visible')
        .type(password)
        .type('{enter}');
    }

    
    acceptPrivacyPolicy() {
        cy.get(this.privacyPolicy).check({ force: true });
    }

    clickOnCreateOrContinueButton() {
        cy.wait(2000);
        cy.get(this.createOrContinueButton).click({ force: true });     

    }

    clickOnVerfiyCodeButton() {
        cy.get(this.verifyCodeButton).click({ force: true });     
    }

    clickOnSendVerificationCodeCreateAccount() {
        cy.get(this.sendCodeCreateAccount).click({ force: true });     
    }

    setPasscode(passcode) {
        this.passcode = passcode; 
    }

    deleteAllEmail() {
        cy.mailosaurDeleteAllMessages(this.serverId);
    }
};

export const resetPasswordPage = new ResetPasswordPage();
