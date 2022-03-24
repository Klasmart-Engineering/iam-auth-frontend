
Feature: Login in with different phone number formats

    # I want ensure that the phone number normalisation method used by AMS and User Service is matched by B2C when creating an account or logging in
    # So that all our users who created their accounts with phone numbers are still able to login when we replace AMS with B2C

    @phone
    Scenario: Preceding zero + country code in the phone number
        Given I am on the kidsloop create account with phone number page
        When I select a country as "US"
        And I enter the phone number as "015342032290"
        And I click on send code for phone and verify the code
        And I enter the password and confirm password and click on Create Account
        Then I should see an error on kidsloop page "An account with this email address or number already exists."

    Scenario Outline: Spaces , Zeros , Round brackets , dots in the phone number
        Given I am on the kidsloop create account with phone number page
        When I select a country as "US"
        And I enter the phone number as '<phoneNumber>'
        When I click on send code for phone
        Then I should see the verify code button
        Examples:
            | phoneNumber    |
            | 15342032290    |
            | 153 4203 2290  |
            | 05342032290    |
            | 005342032290   |
            | (5342)032290   |
            | 05342032290.   |
            | 0534-203-2290. |
            | 0534-203-2290. |

    @stage
    Scenario Outline: Invalid Phone numbers
        Given I am on the kidsloop create account with phone number page
        When I select a country as "US"
        And I enter the phone number as "<phoneNumber>"
        When I click on send code for phone
        Then I should see an error on kidsloop page "<errorMessage>"
        Examples:
            | Test                                    | phoneNumber    | errorMessage                                                                                                         |
            | country code with a plus sign           | +153 4203 2290 | You don't need to include your country code here. Instead, please use the dropdown above to select your country code |
            | country code with a plus sign and zeros | +0015342032290 | You don't need to include your country code here. Instead, please use the dropdown above to select your country code |
            | characters                              | abcd           | Invalid number format. Please ensure that the phone number does not contain any special characters such as []{}().   |