Feature: Receive notification about watched contact
  As an user
  I want to receive notifications about contacts that I watched
  So I can be proactively warned about them

  Scenario: Reporting phone contact
    Given Someone reports a phone contact
    When I search for the phone contact
    Then The reported contact is found

  Scenario: Reporting email contact
    Given Someone reports an email contact
    When I search for the email contact
    Then The reported contact is found