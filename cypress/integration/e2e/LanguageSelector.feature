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
Then I should see the welcome message "Te damos la bienvenida, Login User, ¿cómo estás hoy?"
And I sign out 
And I am redirected to the home page

Scenario: Verify error page on the UI in spanish
  Given I set the locale cookie to 'Spanish'
  When I go to "error" page directly 
  Then I should see error message "¡Ups!"
  And I should see error message "¡Ocurrió un error en nuestro lado!"
  When I click on home button
  Then I am redirected to the home page 

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