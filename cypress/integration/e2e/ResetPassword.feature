Feature: Reset password via email

I want to be able to reset my password via email 

Scenario: Errors on Reset password page
Given I go to reset password page
When I click on create account button
Then I should see the error message "This information is required."
When I enter email and click on send verification code
When I click on create account button
And I enter wrong verification code
When I click on create account button
Then I should see the claim verification error message "The claims for verification control have not been verified."
And I enter wrong verification code
When I click on verify code button 
Then I should see the verification failed error message "The verification has failed, please try again"
And I enter wrong verification code
When I click on verify code button 
Then I should see the verification failed error message "The verification has failed, please try again"
And I enter wrong verification code
When I click on verify code button 
Then I should see the verification failed error message "You've made too many incorrect attempts. Please try again later."


Scenario: Reset password and login
Given I delete all the emails from test mail box
When I go to reset password pageß
And I enter email , verification code and new password
Then I should see the welcome message "how are you doing today"

