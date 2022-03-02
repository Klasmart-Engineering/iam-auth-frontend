Feature: Login with phone number 
@alpha
Scenario: Login via phone number not associated with an organization
Given I login to kidsloop with phone number "15342032290" with country code "United States(+1)"
Then I should see a message on kidsloop page "As your account is not linked to an organization, please wait until your school registers you to access the hub."
And I click on sign out button on account not linked page

@alpha
Scenario: Login with deactivated phone number account
Given I login to kidsloop with phone number "7713162000" with country code "United Kingdom(+44)"
Then I should see an invalid login error "Your account is deactivated. Please contact your organization."

@alpha
Scenario: Login with invalid phone number
Given I enter phone number as "swapnali"
Then I should see an error on kidsloop page "One or more fields are filled out incorrectly. Please check your entries and try again."
And I should see an error on kidsloop page "Invalid number format. Please ensure that the phone number does not contain any special characters such as []{}()."

@alpha
Scenario: Invalid password error verification
Given I enter phone number as "7728727046"
And I enter wrong password
Then I should see an error on kidsloop page "Due to a system upgrade you will have to reset your account password. If you have already done this and are getting this message, then you have entered an invalid password. Please try again or click on the 'Forgot password' link if you need to reset your password."

@alpha
Scenario Outline: Spaces , Zeros , Round brackets , dots in the phone number login
Given I login to kidsloop with phone number "<phoneNumber>" with country code "<countryCode>"
Then I should see the welcome message "how are you doing today?"
When I sign out 
And I am redirected to the home page
Examples:
    |countryCode| phoneNumber | 
    |Romania(+40)| 743808281 |
    |Romania(+40) | 743808281 . |
    |Romania(+40) | 743 808 281 |
    |Romania(+40)  | (74) 3808281 | 
    |Romania(+40)| 074380(82)81 .| 
    #|India(+91)| 0989 0946937 |
    |Romania(+40)| 743808281-|



