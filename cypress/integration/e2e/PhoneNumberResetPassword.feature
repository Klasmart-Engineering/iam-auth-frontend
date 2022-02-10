Feature: Reset password for accounts associated with phone numbers 
User with phone number accounts should be able to reset their passwords 
 @phone
Scenario: Reset password for phone number and login with new passwrod
Given I delete all the emails from test mail box
When I reset password for a phone number
Then I should see a message on kidsloop page "As your account is not linked to an organization, please wait until your school registers you to access the hub."
And I click on sign out button on account not linked page
When I login with the phone Number for which we have reset the password 
Then I should see a message on kidsloop page "As your account is not linked to an organization, please wait until your school registers you to access the hub."
And I click on sign out button on account not linked page

 @phone
Scenario: Errors and send new code functionality
Given I enter phone number on reset password page
And I enter wrong passcode for reset
Then I should see an error on kidsloop page "Wrong code entered, please try again."
And I click on send new code for phone number reset password
And I enter the new passcode from phone number
And I verify code for phone number and confirm the password
Then I should see a message on kidsloop page "As your account is not linked to an organization, please wait until your school registers you to access the hub."
And I click on sign out button on account not linked page


