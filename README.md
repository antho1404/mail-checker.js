mail-checker.js
===============

The easiest way to validate your emails !

This script permits to validate your emails using http://www.mail-checker.com/
The validation works in 3 steps:
  - validate the format of your email
  - validate the domain accessibility
  - check if the email is not a temporary mail (like yopmail...)

## How to use

Simply signup and create your app on http://www.mail-checker.com then add this script in your page with the token given when the application registration is done

    $("input[type=email]").mail_checker('your_api_token_key', {
        success:        function() { }, // stuff when email is valid 
        invalid_format: function() { }, // stuff when email format is invalid
        invalid_domain: function() { }, // stuff when domain doesn't respond
        temporary_mail: function() { }  // stuff when it is a temporary mail
    });
    
You can pass callbacks functions:
  - success: when your email is good
  - invalid_format: when the email is malformed
  - invalid_domain: when the domain is not accessible
  - temporary_mail: when your email is a temporary mail

By default this check will be done on "change" event of your input but you can specify a different event with the parameter "trigger_on"