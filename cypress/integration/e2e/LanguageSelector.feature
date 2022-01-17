Feature: Ability to change the language

As an User 
I would like to change my language from english to other supported languages
so I can read the translations when I am not a native english speaker 

Scenario: Check the Spanish translations
Given I set the locale cookie to 'Spanish'
When I am on the kidsloop login page
Then I should verify the text for 'LoginPage' is displayed in 'Spanish'

Scenario Outline: Load translations based on the language selected
Given I set the locale cookie to '<Language>'
When I am on the kidsloop login page
Then the default language selected should be '<Language>'
Examples:
    | Language | 
    | Spanish  | 
    | Korean   |
    | Thai     |
    |Vietnamese |
    |Indonesia|
    |Chinese|