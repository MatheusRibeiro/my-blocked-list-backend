Feature: Read notification
  As an user
  I want to mark as read notifications about contacts that I watched
  So I can know which notifications are new

  Scenario: Read notification from watched contact
    Given I received a notification about a watched contact
    When I read the notification
    Then The notification is marked as read