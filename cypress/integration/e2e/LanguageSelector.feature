@alpha
Feature: Ability to change the language

As an User 
I would like to change my language from english to other supported languages
so I can read the translations when I am not a native english speaker 
Scenario: Language selection should be carried over to hub
Given I am on the kidsloop login page
When I select the language selector to "Español"
And I verify the text on "LoginPage" is displayed in "Spanish"
And I enter a valid email "loginautomatioauserwitharg@geqtbdzt.mailosaur.net"
And I enter password as "Abcd1234" 
And I click on login button
Then I should see the welcome message "¿cómo estás hoy?"
And I sign out 
And I am redirected to the home page


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