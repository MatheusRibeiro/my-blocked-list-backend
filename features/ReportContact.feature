Feature: Report Contact
  As an user
  I want to create a complaint about a contact
  So other users can find out about it

  Scenario: Reporting phone contact
    Given I report a phone contact
    When I search for the phone contact
    Then The reported contact is found

  Scenario: Reporting email contact
    Given I report an email contact
    When I search for the email contact
    Then The reported contact is found