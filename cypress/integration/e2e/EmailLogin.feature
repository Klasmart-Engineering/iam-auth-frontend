@alpha
Feature: Login functionality at Kidsloop

I want to login to kidsloop

Scenario: Logging with email not associated with any organization
  Given I login to kidsloop with a valid user "automation1643015189914@geqtbdzt.mailosaur.net"
  Then I am taken to "You are not part of an organization."
  And I remove cookies

Scenario: Logging with email associated with an organization 
  Given I login to kidsloop with a valid user "loginautomatioauserwitharg@geqtbdzt.mailosaur.net"
  Then I should see the welcome message "how are you doing today?"
  When I sign out 
  And I am redirected to the home page

Scenario: Logging with email with multiple profiles + spaces in email address
  Given I login to kidsloop with a valid user " loginautomationusermultipleprofiles@geqtbdzt.mailosaur.net "
  When I select the first profile from the list
  Then I should see the welcome message "how are you doing today?"
  When I sign out 
  And I am redirected to the home page
Scenario: Login with an invalid account
Given I am on the kidsloop login page
When I enter invalid email for logging in as "qa+stress_t1@calmid.com"
And I enter the password and login
Then I should see an invalid login error "Sorry, we don’t recognise your login details! Please check that you’ve entered them correctly and try again."

Scenario: Logging with email associated with an organization 
  Given I login to kidsloop with a valid user "AutoMatIon1643014708387@geqtbdzt.mailosaur.net"
  Then I should see the welcome message "how are you doing today?"
  When I sign out 
   And I am redirected to the home page

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
  When I enter invalid email as "deactivatedAccount@geqtbdzt.mailosaur.net"
  When I enter password as "Abcd1234" 
  And I click on login button
  Then I should see an invalid login error "Your account is deactivated. Please contact your organization."
Scenario: Error message for wrong email and wrong password
  Given I am on the kidsloop login page 
  When I enter invalid email as "abc"
  And I click on login button
  Then I should see an invalid email error 'Please enter a valid email address'
  And I enter a valid email "swapnali.bhansali@gmail.com"
  When I enter wrong password 
Then I should see an invalid login error "Sorry, we don’t recognise your login details! Please check that you’ve entered them correctly and try again."

  Scenario: Login with student account
  Given I login to kidsloop with a valid user "automationStudent@geqtbdzt.mailosaur.net"
  Then I should see the welcome message "Welcome Student, how are you doing today?"
  When I sign out 
  And I am redirected to the home page
  Scenario: Login with parent account
  Given I login to kidsloop with a valid user "automationParent@geqtbdzt.mailosaur.net"
  Then I should see the welcome message "how are you doing today?"
  When I sign out 
  And I am redirected to the home page

  Scenario: Login with school admin account
  Given I login to kidsloop with a valid user "automationSchoolAdmin@geqtbdzt.mailosaur.net"
  Then I should see the welcome message "how are you doing today?"
  When I sign out 
  And I am redirected to the home page
 
Scenario: 15 mins timeout on select profile screen multiple profiles 
# Removing the access cookie which is valid for 15 mins. It will simulate the expiry. 
  Given I login to kidsloop with a valid user "loginautomationusermultipleprofiles@geqtbdzt.mailosaur.net"
  And I wait for the select profile page to be visible 
  When I delete "access" cookie  
  And I select the first profile from the list
  When I sign out 
  Then I should see the welcome message "how are you doing today?"
  And I am redirected to the home page