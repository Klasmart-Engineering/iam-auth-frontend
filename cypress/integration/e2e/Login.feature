Feature: Login functionality at Kidsloop

I want to login to kidsloop

#Scenario: Logging with email not associated with any organization
 # Given I login to kidsloop via SSO with a valid user "LoginAutomationUser@zw6ahich.mailosaur.net"
 # Then I am taken to "You are not part of an organization."
 # Bug 792

Scenario: Logging with email associated with an organization 
  Given I login to kidsloop via SSO with a valid user "loginautomationuserwithorg@zw6ahich.mailosaur.net"
  Then I should see the welcome message "Welcome LoginUser, how are you doing today?"
  When I sign out 
  And I am redirected to the home page

Scenario: Logging with email with multiple profiles 
  Given I login to kidsloop via SSO with a valid user "loginautomationusermultipleprofiles@zw6ahich.mailosaur.net"
  When I select the first profile from the list
  Then I should see the welcome message "how are you doing today?"
  When I sign out 
  And I am redirected to the home page

Scenario: Login via phone number associated with an organization
  Given I login to kidsloop via SSO with phone number "+12692304118"
  Then I should see the welcome message "Welcome Automation, how are you doing today?"
  When I sign out 
  And I am redirected to the home page

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

Scenario: Login with a deactivated account 
  Given I am on the kidsloop login page 
  When I enter invalid email as "deactivatedAccount@zw6ahich.mailosaur.net"
  When I enter password as "Abcd1234" 
  And I click on login button
  Then I should see an invalid login error "Your account has been locked. Contact your support person to unlock it, then try again."

Scenario: Error message for wrong email and wrong password
  Given I am on the kidsloop login page 
  When I enter invalid email as "abc"
  And I click on login button
  Then I should see an invalid email error "Please enter a valid email address."
  And I enter a valid email "swapnali.bhansali@kidsloop.live"
  When I enter wrong password 
  Then I should see an invalid login error "Sorry, we don’t recognise your login details! Please check that you’ve entered them correctly and try again."
