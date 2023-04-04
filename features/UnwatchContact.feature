Feature: Unwatch Contact
  As an user
  I want to unwatch a contact
  So I won't receive notifications about it

  Scenario: Unwatch contact
    Given I watch a contact
    When I unwatch the contact
    Then My user is no longer in the watched contact list
