Feature: Login with phone number 

Scenario: Login via phone number not associated with an organization
Given I login to kidsloop with phone number "9890316937" with country code "India(+91)"
Then I am taken to "You are not part of an organization."
And I remove cookies

Scenario: Login with deactivated phone number account
Given I login to kidsloop with phone number "7713162000" with country code "United Kingdom(+44)"
Then I should see an invalid login error "Your account has been locked. Contact your support person to unlock it, then try again."

Scenario: Login with invalid phone number
Given I enter phone number as "swapnali"
Then I should see an error on kidsloop page "One or more fields are filled out incorrectly. Please check your entries and try again."
And I should see an error on kidsloop page "Invalid number format. Please ensure that the phone number does not contain any special characters such as []{}()."

Scenario Outline: Spaces , Zeros , Round brackets , dots in the phone number login
Given I login to kidsloop with phone number "<phoneNumber>" with country code "<countryCode>"
Then I should see the welcome message "how are you doing today?"
When I sign out 
And I am redirected to the home page
Examples:
    |countryCode| phoneNumber | 
    |United States(+1) | 2692304118 |
    |United States(+1) | 2692304118. |
    |United States(+1) | 269 2304 118|
    |United States(+1)  | (26) 923 04118| 
    |India(+91)| 0989094(69)37.| 
    |India(+91)| 0989 0946937 |
    |India(+91)| 098- 90946937 |
    |India(+91)| 09890946937 |



