import config from "../../configs/config";
import { JSDOM } from "jsdom";
import { resetPasswordPage } from "../page_objects/resetPasswordPage";

class PasscodeUtils {

    async generatePasscode (testEmail: string, verificationcodeText: string)  {
        let number;
        cy.wait(10000).then(() => {
            cy.log(`waited for 10 seconds`);
        });
         cy.mailosaurGetMessage(Cypress.env(`mailosaurServerId`), {
            sentTo: testEmail,
        }, {           
            receivedAfter: new Date(`2022-01-21T00:00:00Z`),
        }).then(email => {
            expect(email.subject).to.contain(`verification code`);
            const dom = new JSDOM(email.html.body);
            const el = dom.window.document.querySelector(`#BodyPlaceholder_UserVerificationEmailBodySentence2`);
            const matches = /([0-9]{6})$/.exec(el.textContent);
            number = matches[0];
            cy.log(number);
            cy.get(verificationcodeText)
                .should(`be.visible`).clear()
                .type(number);
            resetPasswordPage.setLatestPasscodeValue(number);
        });
    }

    generatePasscodeFromSMS (phoneNumber: string, verificationcodeText: string)  {
       const mailosaurkey = Cypress.env(`MAILOSAUR_API_KEY`);
       // Mailosaur provides us only one phone number which is associated with the following API key. 
       // Hence I need to set it at a function level and not application level , so other tests on Alpha do not fail 
       cy.mailosaurSetApiKey(`owboMCfesf7fOud5`);

        cy.wait(20000).then(() => {
            cy.log(`waited for 20 seconds`);
        });
        
        cy.mailosaurGetMessage(`geqtbdzt`, {
            sentTo: phoneNumber,
        }, {
            receivedAfter: new Date(`2022-01-21T00:00:00Z`),
        }).then(phone => {
            cy.log(`body `, phone.text.body);
            const regEx = new RegExp(`([0-9]{6})`);
            const matches = regEx.exec(phone.text.body);
            cy.log(matches[0]);
            cy.get(verificationcodeText)
                .should(`be.visible`)
                .type(matches[0]);
        });
        cy.mailosaurSetApiKey(mailosaurkey);

    }
}

export const passcodeUtils = new PasscodeUtils();
