Feature: Create account via email

#Scenario: Create account via phone number and login 
#Given I create a new account with a new phone number "2692304118"
#Then I am taken to "You are not part of an organization."

Scenario: create account with email and login successfully
When I create a new account with a new email address
Then I am taken to "You are not part of an organization."

Scenario: create duplicate account with email and verify error message
Given I am on the kidsloop create account page
When I enter an existing email address as the new email address 
And I click on send code and verify the code 
And I enter the password and click on Create Account
Then I should an error on create account page "An account with this email address or number already exists."

Scenario: create account via resend code functionality with email and login successfully
Given I am on the kidsloop create account page
And I enter a new email and click on send verification code
And I enter the code
When I click on send code again button
And I enter the new verification code
And I enter the password and click on Create Account
Then I am taken to "You are not part of an organization."

Scenario: Verify 5 min code expiry with email account and login successfully with new code
Given I am on the create account page & I send the code to the new email address 
When I wait for 5 mins for the code to expire 
Then I should an error on create account page "The code has expired."
When I click on send code again button
And I enter the new verification code
And I enter the password and click on Create Account
Then I am taken to "You are not part of an organization."







