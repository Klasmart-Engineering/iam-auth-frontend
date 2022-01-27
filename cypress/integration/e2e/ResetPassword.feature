Feature: Reset password via email

I want to be able to reset my password via email 

Scenario: Errors on Reset password page
Given I go to reset password page
When I click on reset code button
Then I should see an error on kidsloop page "This information is required."
And I enter email and click on send reset code
And I enter wrong verification code
When I click on create account button
Then I should see an error on kidsloop page "The claims for verification control have not been verified."
And I enter wrong verification code
When I click on verify code button 
Then I should see an error on kidsloop page "The verification has failed, please try again"
And I enter wrong verification code
When I click on verify code button 
Then I should see an error on kidsloop page "The verification has failed, please try again"
And I enter wrong verification code
When I click on verify code button 
Then I should see an error on kidsloop page "You've made too many incorrect attempts. Please try again later."

Scenario: Reset password and login with new passwrod
Given I delete all the emails from test mail box
When I go to reset password page
And I enter email , verification code and new password
Then I should see the welcome message "how are you doing today"
And I sign out
And I am redirected to the home page
When I login with the email for which we have reset the password 
Then I should see the welcome message "how are you doing today"
And I sign out
And I am redirected to the home page

Scenario: Reset password with send new code functionality
Given I delete all the emails from test mail box
When I go to reset password page
And I enter email and verification code 
And I click on send new code button
When I enter the old passcode
And I click on verify code button
Then I should see an error on kidsloop page "The verification has failed, please try again"
And I enter the new passcode from email 
And I verify code and confirm the password 
Then I should see the welcome message "You are not part of an organization."
And I remove cookies




