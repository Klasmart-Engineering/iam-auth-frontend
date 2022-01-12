import config from "../../configs/config";
import { JSDOM } from "jsdom";

class PasscodeUtils {

    generatePasscode (testEmail: string, verificationcodeText: string)  {
        let number;
        cy.wait(10000).then(() => {
            cy.log(`waited for 10 seconds`);
        });
        cy.mailosaurGetMessage(config.mailosaurServerId, {
            sentTo: testEmail,
        }).then(email => {
            expect(email.subject).to.equal(`KidsLoop Hub - POC account email verification code`);
            const dom = new JSDOM(email.html.body);
            const el = dom.window.document.querySelector(`#BodyPlaceholder_UserVerificationEmailBodySentence2`);
            const matches = /([0-9]{6})$/.exec(el.textContent);
            number = matches[0];
            cy.log(number);
            cy.get(verificationcodeText)
                .should(`be.visible`)
                .type(number);
        });
    }

    generatePasscodeFromSMS (phoneNumber: string, verificationcodeText: string)  {
        cy.wait(20000).then(() => {
            cy.log(`waited for 10 seconds`);
        });
        cy.mailosaurGetMessage(config.mailosaurServerId, {
            sentTo: config.mailosaurPhoneNumber,
        }, {
            receivedAfter: new Date(`2021-12-12T00:00:00Z`),
        }).then(phone => {
            cy.log(`body `, phone.text.body);
            const regEx = new RegExp(`([0-9]{6})`);
            const matches = regEx.exec(phone.text.body);
            cy.log(matches[0]);
            cy.get(verificationcodeText)
                .should(`be.visible`)
                .type(matches[0]);
        });
    }
}

export const passcodeUtils = new PasscodeUtils();
