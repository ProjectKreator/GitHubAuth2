
## <a href="https://www.eventedmind.com/feed/meteor-customizing-login" target="_blank">Customizing Meteor Login</a>

**Meteor**<br>
**Tutorial**

In this tutorial you'll learn how to customize Meteor's login configuration and
user interface. We'll add the accounts-github package to authenticate against
Github, and the service-configuration package to provide a client id and secret
in our code instead of the app. Then we'll use the onLogin and onCreateUser
hooks to grab some additional information about the user from Github using
Meteor's http package. In the user interface you'll see how to accommodate all
the possible states of login and see how to use the new loginServicesConfigured
method of Accounts.

