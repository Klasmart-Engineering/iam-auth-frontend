Feature: Login functionality at Kidsloop

I want to login to kidsloop
 @stage 
Scenario: Logging with email not associated with any organization
  Given I login to kidsloop with a valid user "automation1643015189914@geqtbdzt.mailosaur.net"
  Then I should see a message on kidsloop page "As your account is not linked to an organization, please wait until your school registers you to access the hub."
  And I click on sign out button on account not linked page
 
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

 @stage 
Scenario: Login with an invalid account
Given I am on the kidsloop login page
When I enter invalid email for logging in as "qa+stress_t1@calmid.com"
And I enter the password and login
Then I should see an invalid login error "Due to a system upgrade you will have to reset your account password. If you have already done this and are getting this message, then you have entered an invalid password. Please try again or click on the 'Forgot password' link if you need to reset your password."

 @stage 
Scenario: Logging with email associated with an organization 
  Given I login to kidsloop with a valid user "AutoMatIon1643014708387@geqtbdzt.mailosaur.net"
  Then I should see the welcome message "how are you doing today?"
  When I sign out 
   And I am redirected to the home page

Scenario: Multiple wrong password attempts 
  Given I am on the kidsloop login page 
  And I enter a valid email "automation1640099962914@zw6ahich.mailosaur.net"
  When I enter wrong password 
  Then I should see an invalid login error "Due to a system upgrade you will have to reset your account password. If you have already done this and are getting this message, then you have entered an invalid password. Please try again or click on the 'Forgot password' link if you need to reset your password."
  When I enter wrong password 
  Then I should see an invalid login error "Due to a system upgrade you will have to reset your account password. If you have already done this and are getting this message, then you have entered an invalid password. Please try again or click on the 'Forgot password' link if you need to reset your password."
  When I enter wrong password 
  Then I should see an invalid login error "Due to a system upgrade you will have to reset your account password. If you have already done this and are getting this message, then you have entered an invalid password. Please try again or click on the 'Forgot password' link if you need to reset your password."
  When I enter wrong password 
  Then I should see an invalid login error "Due to a system upgrade you will have to reset your account password. If you have already done this and are getting this message, then you have entered an invalid password. Please try again or click on the 'Forgot password' link if you need to reset your password."

@stage
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
Then I should see an invalid login error "Due to a system upgrade you will have to reset your account password. If you have already done this and are getting this message, then you have entered an invalid password. Please try again or click on the 'Forgot password' link if you need to reset your password."

@stage
  Scenario: Login with student account
  Given I login to kidsloop with a valid user "automationStudent@geqtbdzt.mailosaur.net"
  Then I should see "Student" under the user name 
  When I sign out 
  And I am redirected to the home page

@stage
  Scenario: Login with parent account
  Given I login to kidsloop with a valid user "automationParent@geqtbdzt.mailosaur.net"
  Then I should see the welcome message "how are you doing today?"
  And  I should see "Parent" under the user name 
  When I sign out 
  And I am redirected to the home page

@stage
  Scenario: Login with school admin account
  Given I login to kidsloop with a valid user "automationSchoolAdmin@geqtbdzt.mailosaur.net"
  Then I should see the welcome message "how are you doing today?"
  And  I should see "School Admin" under the user name 
  When I sign out 
  And I am redirected to the home page


Scenario: 15 mins timeout on select profile screen multiple profiles 
# Removing the access cookie which is valid for 15 mins. It will simulate the expiry. 
  Given I login to kidsloop with a valid user "loginautomationusermultipleprofiles@geqtbdzt.mailosaur.net"
  And I wait for the select profile page to be visible 
  When I delete "access" cookie  
  And I select the first profile from the list
  Then I should see the welcome message "how are you doing today?"
  When I sign out 
  And I am redirected to the home page