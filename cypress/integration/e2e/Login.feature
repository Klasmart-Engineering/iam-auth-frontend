Feature: Login functionality at Kidsloop

I want to login to kidsloop

Scenario: Logging with email not associated with any organization
  Given I login to kidsloop via SSO with a valid user "LoginAutomationUser@zw6ahich.mailosaur.net"
  Then I am taken to "You are not part of an organization."
 # When I sign out 
 # And I should see login page
@focus 
Scenario: Logging with email associated with an organization 
  Given I login to kidsloop via SSO with a valid user "loginautomationuserwithorg@zw6ahich.mailosaur.net"
  Then I should see the welcome message "Welcome LoginUser, how are you doing today?"
  When I sign out 
  And I should see login page

Scenario: Login via phone number associated with an organization
  Given I login to kidsloop via SSO with phone number "+12692304118"
  Then I should see the welcome message "Welcome Automation, how are you doing today?"
  When I sign out 
  And I should see login page

Scenario: Login via phone number not associated with an organization
  Given I login to kidsloop via SSO with phone number "+919890316937"
  Then I am taken to "You are not part of an organization."

Scenario: Login with an invalid account
Given I am on the kidsloop login page
When I enter invalid email for logging in as "qa+stress_t1@calmid.com"
And I enter the password and login
Then I should see an invalid login error "Sorry, we don’t recognise your login details! Please check that you’ve entered them correctly and try again."

Scenario: Multiple wrong password attempts 
  Given I am on the kidsloop login page 
  And I enter a valid email "automation1640099962914@zw6ahich.mailosaur.net"
  When I enter wrong password 
  Then I should see an invalid login error "Sorry, we don’t recognise your login details! Please check that you’ve entered them correctly and try again."
  When I enter wrong password 
  Then I should see an invalid login error "Sorry, we don’t recognise your login details! Please check that you’ve entered them correctly and try again."
  When I enter wrong password 
  Then I should see an invalid login error "Sorry, we don’t recognise your login details! Please check that you’ve entered them correctly and try again."
  When I enter wrong password 
  Then I should see an invalid login error "Sorry, we don’t recognise your login details! Please check that you’ve entered them correctly and try again."

Scenario: Error message for wrong email and wrong password
  Given I am on the kidsloop login page 
  When I enter invalid email as "abc"
  And I click on login button
  Then I should see an invalid email error "Please enter a valid email address."
  And I enter a valid email "swapnali.bhansali@kidsloop.live"
  When I enter wrong password 
  Then I should see an invalid login error "Sorry, we don’t recognise your login details! Please check that you’ve entered them correctly and try again."
