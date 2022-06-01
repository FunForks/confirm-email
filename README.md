# Email Confirmation Demo

This repository creates a server which:

1. Provides a form where you can enter an email address
2. Uses the [nodemailer](https://nodemailer.com/about/) module to send an email to the [ethereal.email](https://ethereal.email/) SMTP server. This email is never delivered to the recipient, but you can view it and interact with it on the [ethereal.email](https://ethereal.email/) server.
3. Handles the request triggered by the link in the email
4. Verifies the integrity of the JWT token
5. Displays the confirmed email address

>This repository  is intended to show how to send a confirmation email and how to handle the user's confirmation that they have received it.
>
> **It does not interact with any database to create a User document or update it to indicate the the email address has been confirmed.**