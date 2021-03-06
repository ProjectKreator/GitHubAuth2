if (Meteor.isClient) {
  Meteor.subscribe('user');

  Template.LoginMenu.events({
    'click [data-action=login]'(e, tmpl) {
      e.preventDefault();
      Meteor.loginWithGithub({requestPermissions: ['email']});
    },

    'click [data-action=logout]'(e, tmpl) {
      e.preventDefault();
      Meteor.logout();
    }
  });

  Template.LoginMenu.helpers({
    isLoginServicesConfigured() {
      return Accounts.loginServicesConfigured();
    }
  });
}

if (Meteor.isServer) {
  ServiceConfiguration.configurations.upsert({service: 'github'}, {
    $set: {
      clientId: '5054620913a69fa25a53',
      secret: '2a4539c6f900f0ae57cf1412d8b3bf89c35554a1',
      loginStyle: 'popup'
    }
  });

  function getUserInfo (accessToken) {
    let result = HTTP.get("https://api.github.com/user", {
      headers: {
        'User-Agent': 'Meteor'
      },

      params: {
        access_token: accessToken
      }
    });

    return _.pick(result.data, 'login', 'email');
  }

  Accounts.onCreateUser((options, user) => {
    user.profile = getUserInfo(user.services.github.accessToken);
    user.login = user.profile.login;
    user.email = user.profile.email;
    return user;
  });

  Accounts.onLogin((loginInfo) => {
    let user = loginInfo.user;
    let accessToken = user.services.github.accessToken;
    let userInfo = getUserInfo(accessToken);
    Meteor.users.update({_id: user._id}, {
      $set: {
        profile: userInfo,
        login: userInfo.login,
        email: userInfo.email
      }
   });
  });

  Meteor.publish('user', function () {
    return Meteor.users.find({_id: this.userId}, {fields: {_id: 1, profile: 1, login: 1, email: 1}});
  });
}
