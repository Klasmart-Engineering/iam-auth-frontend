Feature: Reset password for accounts associated with phone numbers 
User with phone number accounts should be able to reset their passwords 
 
Scenario: Reset password for phone number and login with new passwrod
Given I delete all the emails from test mail box
When I reset password for a phone number
Then I am taken to "You are not part of an organization."
And I remove cookies
When I login with the phone Number for which we have reset the password 
Then I am taken to "You are not part of an organization."
And I remove cookies
 
Scenario: Errors and send new code functionality
Given I enter phone number on reset password page
And I enter wrong passcode for reset
Then I should see an error on kidsloop page "Wrong code entered, please try again."
And I click on send new code for phone number reset password
And I enter the new passcode from phone number
And I verify code for phone number and confirm the password
Then I am taken to "You are not part of an organization."
And I remove cookies

