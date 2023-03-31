Feature: Receive notification about watched contact
  As an user
  I want to receive notifications about contacts that I watched
  So I can be proactively warned about them

  Scenario: Subscribe for phone contact
    Given I subscribe for notifications about a phone contact
    When Someone reports the phone contact
    Then I receive a notification about the phone complaint

  Scenario: Subscribe for email contact
    Given I subscribe for notifications about a email contact
    When Someone reports the email contact
    Then I receive a notification about the email complaint