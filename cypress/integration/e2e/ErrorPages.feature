Feature: Test error pages

I want to check the UI for 404 

Scenario: Verify 404 page UI
  When I go to "404" page directly 
  Then I should see error message "Oops! Broken link."
  And I should see error message "Let's take you home."
  When I click on home button
  Then I am redirected to the home page 

Scenario: Verify error page on the UI
  When I go to "error" page directly 
  Then I should see error message "Oops!"
  And I should see error message "Something went wrong on our side!"
  When I click on home button
  Then I am redirected to the home page 

