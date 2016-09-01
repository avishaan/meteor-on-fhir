// add tests to this file using the Nightwatch.js API
// http://nightwatchjs.org/api


module.exports = {
  tags: ['accounts', 'passwords', 'users', 'entry'],
  'User can sign up.': function (client) {
    client.resizeWindow(1200, 1024);

    const signupPage = client.page.signupPage();
    const indexPage = client.page.indexPage();

    client.page.signupPage()
      .navigate()
      .signup('Alice', 'Doe', 'alice@test.org', 'alicedoe')
      .pause(1000, client);

    client
      .assert.elementPresent('#indexPage')
      .assert.containsText('#authenticatedUsername', "Alice Doe")
      .saveScreenshot("tests/nightwatch/screenshots/accounts/A-SignUp.png");
  },
  'User gets logged in after signup.': function (client) {
    client
      .assert.elementPresent('#indexPage')
      .saveScreenshot("tests/nightwatch/screenshots/accounts/B-AuthenticatedIndex.png")
      .pause(3000)  //wait for alert to disappear
  },
  'User can log out.': function (client) {
    client.assert.elementPresent('#authenticatedUsername')
      .saveScreenshot("tests/nightwatch/screenshots/accounts/C-AuthenticatedMenu.png")
      .assert.containsText('#authenticatedUsername', 'Alice Doe')
      .click('#authenticatedUsername').pause(1500)
      .saveScreenshot("tests/nightwatch/screenshots/accounts/C-LogoutMenu.png")
      .assert.elementPresent('#authenticatedUserMenu .notificationMenu .logoutMenuItem')
      .click('#authenticatedUserMenu .notificationMenu .logoutMenuItem').pause(500)
      .assert.elementPresent('#loginPage')
  },
  'User can sign in.': function (client) {
    const loginPage = client.page.loginPage();
    const indexPage = client.page.indexPage();

    client.page.loginPage()
      .navigate()
      .login("alice@test.org", "alicedoe")
      .pause(2000, client);

    indexPage.expect.element('#indexPage').to.be.present;
    indexPage.expect.element('#authenticatedUsername').text.to.contain('Alice Doe');
  },
  "User can view profile.": function (client) {
    client
      .assert.elementPresent("#authenticatedUsername")
      .click("#authenticatedUsername").pause(500)

      .assert.elementPresent("#authenticatedUserMenu .profileMenuItem")
      .click("#authenticatedUserMenu .profileMenuItem").pause(500)

      .assert.elementPresent("#myProfilePage")
  },
  "User can edit profile avatar.": function (client) {
    var myArray = 'https://pbs.twimg.com/profile_images/436598467956187136/yncbkX83_400x400.jpeg'.split('');

    client
      .assert.elementPresent('#avatarImage')
      .assert.attributeEquals('#avatarImage', 'src', 'http://localhost:3000/thumbnail.png')

      .assert.elementPresent('input[name="avatar"]')
        .clearValue('input[name="avatar"]')
        .setValue('input[name="avatar"]', 'https://foo').pause(500)
        .assert.attributeEquals('#avatarImage', 'src', 'http://localhost:3000/noAvatar.png')

      .assert.elementPresent('input[name="avatar"]')
        .clearValue('input[name="avatar"]')

        for(var i=0; i < myArray.length; i++) {
          client.setValue('input[name="avatar"]', myArray[i]).pause(50);
        };

        client.pause(3000).assert.attributeEquals('#avatarImage', 'src', 'https://pbs.twimg.com/profile_images/436598467956187136/yncbkX83_400x400.jpeg')
  },
  "User can change password.": function (client) {
    var oldPassArray = 'alicedoe'.split('');
    var newPassArray = 'alice123'.split('');

    client
      .assert.elementPresent("label.passwordTab")
      .click("label.passwordTab").pause(500)

      .assert.elementPresent("input[name=oldPassword]")
      .assert.elementPresent("input[name=newPassword]")
      .assert.elementPresent("input[name=confirmPassword]")
      .assert.elementPresent("#changePasswordButton")


        .clearValue('input[name="oldPassword"]')
        .clearValue('input[name="newPassword"]')
        .clearValue('input[name="confirmPassword"]').pause(300);

        // .setValue('input[name="oldPassword"]', 'alice').pause(300)
        // .setValue('input[name="newPassword"]', 'alice123').pause(300)
        // .setValue('input[name="confirmPassword"]', 'alice123').pause(300)
        for(var i=0; i < oldPassArray.length; i++) {
          client.setValue('input[name="oldPassword"]', oldPassArray[i]).pause(100);
        };
        for(var i=0; i < newPassArray.length; i++) {
          client.setValue('input[name="newPassword"]', newPassArray[i]).pause(100);
        };
        for(var i=0; i < newPassArray.length; i++) {
          client.setValue('input[name="confirmPassword"]', newPassArray[i]).pause(100);
        };

        client.click("#changePasswordButton").pause(1000)

        .assert.attributeEquals('input[name="oldPassword"]', 'value', '')
        .assert.attributeEquals('input[name="newPassword"]', 'value', '')
        .assert.attributeEquals('input[name="confirmPassword"]', 'value', '')

      .assert.elementPresent("#authenticatedUsername")
      .click("#authenticatedUsername").pause(500)

      .assert.elementPresent("#authenticatedUserMenu .logoutMenuItem")
      .click("#authenticatedUserMenu .logoutMenuItem").pause(500)

      .assert.elementPresent("#loginPage")
  },
  "User can sign in with new password.": function (client) {
    client
        .assert.elementPresent("#loginPage")
        .assert.elementPresent('input[name="emailAddress"]')
        .assert.elementPresent('input[name="password"]')
        .assert.elementPresent('#loginButton')

        .clearValue('input[name="emailAddress"]')
        .clearValue('input[name="password"]')

        .setValue('input[name="emailAddress"]', 'alice@test.org')
        .setValue('input[name="password"]', 'alice123')

        .click("#loginButton").pause(1000)
          .assert.elementPresent("#indexPage");
  },
  "User can delete account.": function (client) {
    // log out
    var userIdArray = "alice@test.org";

    client
      .assert.elementPresent("#authenticatedUsername")
      .click("#authenticatedUsername").pause(500)

      .assert.elementPresent("#authenticatedUserMenu .profileMenuItem")
      .click("#authenticatedUserMenu .profileMenuItem").pause(500)

      // the menu doesn't auto-close, so we need to manually close it
      // so it doesn't obscure other components
      .assert.elementPresent("#authenticatedUsername")
      .click("#authenticatedUsername").pause(500)

      .assert.elementPresent("label.systemTab")
      .click("label.systemTab").pause(500)

      .assert.elementPresent("#deleteUserButton")
      .click("#deleteUserButton").pause(500)


      .assert.elementPresent("input[name='_id']")
      .assert.elementPresent("input[name='email']")
      .assert.elementPresent("input[name='confirm']")
      .clearValue('input[name="confirm"]');

      for(var i=0; i < userIdArray.length; i++) {
        client.setValue('input[name="confirm"]', userIdArray[i]).pause(50)
      }

      client.assert.elementPresent("#confirmDeleteUserButton")
      .click("#confirmDeleteUserButton").pause(1500)

      .assert.elementPresent("#loginPage")
      .end();
  }
};
