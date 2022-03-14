Feature: Create account via email
 
   # Scenario: Create account via phone number and login
   # Given I create a new account with a new phone number "5342032290"
   # Then I am taken to "You are not part of an organization."
 @stage 
    Scenario: create account with email and login successfully
        When I create a new account with a new email address
        Then I should see a message on kidsloop page "As your account is not linked to an organization, please wait until your school registers you to access the hub."
        And I click on sign out button on account not linked page

    Scenario: create account with email with upper case letters and login successfully
        When I create a new account with a new email address with upper case letters
        Then I should see a message on kidsloop page "As your account is not linked to an organization, please wait until your school registers you to access the hub."
        And I click on sign out button on account not linked page
        And I login to kidsloop via SSO with a valid user created before
        Then I should see a message on kidsloop page "As your account is not linked to an organization, please wait until your school registers you to access the hub."
        And I click on sign out button on account not linked page
        
@stage 
    Scenario: create account via resend code functionality with email and login successfully
        Given I am on the kidsloop create account page
        And I enter a new email and click on send verification code
        And I enter the code
        When I click on send code again button
        And I enter the new verification code
        And I enter the password and click on Create Account
        Then I should see a message on kidsloop page "As your account is not linked to an organization, please wait until your school registers you to access the hub."
        And I click on sign out button on account not linked page

@phone
    Scenario: create duplicate account with phone number and verify error message
        Given I am on the kidsloop create account with phone number page
        When I enter an existing account phone number as a new account phone number
        And I click on send code for phone and verify the code
        And I enter the password and confirm password and click on Create Account
        Then I should see an error on kidsloop page "An account with this email address or number already exists."

    Scenario: create duplicate account with email and verify error message
        Given I am on the kidsloop create account page
        When I enter an existing email address as the new email address
        And I click on send code and verify the code
        And I enter the password and click on Create Account
        Then I should see an error on kidsloop page "An account with this email address or number already exists."

    Scenario: Verify 5 min code expiry with email account and login successfully with new code
        Given I am on the create account page & I send the code to the new email address
        When I wait for 5 mins for the code to expire
        Then I should see code expired error "The code has expired"
        When I click on send code again button
        And I enter the new verification code
        And I enter the password and click on Create Account
        Then I should see a message on kidsloop page "As your account is not linked to an organization, please wait until your school registers you to access the hub."
        And I click on sign out button on account not linked page

 @stage 
    Scenario: Error messages on create account with email page
        Given I am on the kidsloop create account page
        When I enter invalid format email address as "abc"
        Then I should see an error on kidsloop page "Please enter a valid email address"
        When I enter password on create account with phone number page as "abcd"
        Then I should see an error on the password box as "8-16 characters, containing 3 out of 4 of the following: Lowercase characters, uppercase characters, digits"      
    #And I should see an error above the policy box "This information is required."

 @stage 
    Scenario: Verify if user is able to login by email when pressing 'Log in' link from create account page with email
        Given I am on the kidsloop create account page
        When I click on Log in link
        And I login to kidsloop with a valid user "loginautomatioauserwitharg@geqtbdzt.mailosaur.net"
        Then I should see the welcome message "how are you doing today?"
        And I sign out
        And I am redirected to the home page
        
 @stage 
    Scenario: Verify if user is able to login by phone when pressing 'Log in' link from create account page with phone number
        Given I am on the kidsloop create account with phone number page
        When I click on Log in link
        And I login to kidsloop with phone number "0743808281" with country code "Romania(+40)"
        Then I should see the welcome message "how are you doing today?"
        And I sign out
        And I am redirected to the home page


        Scenario: Check error message when creating an account with kidsloop domain email 
         Given I am on the kidsloop create account page
         When  I enter an email with kidsloop domain 'anything@kidsloop.live'
         Then I should see a message on kidsloop page "It is not possible to create an account with a KidsLoop email address. Please sign-in instead."
