@alpha
Feature: Test error pages

I want to check the UI for 404 

Scenario Outline: Verify error pages on UI
  Given I set the locale cookie to "<locale>"    
  When I go to "<errorPage>" page directly 
  Then I should see error message "<errorMessage1>"
  And I should see error message "<errorMessage2>"
  When I click on home button
  Then I am redirected to the home page 
  Examples:
    |locale  | errorPage | errorMessage1 | errorMessage2 |
    | English | 404  | Oops! Broken link.  | Let's take you home. |
    | English |error | Oops! | Something went wrong on our side! |
    | Spanish | 404  | ¡Uy! El enlace no funciona.  | Vayamos al inicio. |
    | Spanish| error | ¡Ups! | ¡Ocurrió un error en nuestro lado! |