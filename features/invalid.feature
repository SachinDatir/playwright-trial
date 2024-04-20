Feature: Validate invalid login cred

Scenario: User should be able to login with invalid cred
Given User has browsed the login hrm page
When User supply invalid <"username"> and "<password>"
Then User will find an error message

Examples:
    | username | password |
    | Admin  | admin12  |

    