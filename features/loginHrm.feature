Feature: Validate orangeHrm login functionality
  @Regression
   Scenario: User should be able to login with valid credentials
   Given User has browsed the login page
   When User suply username and password
   Then User will find the dashboard page
