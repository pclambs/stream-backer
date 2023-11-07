# Decode and Read JSON Web Token (Client-side)

In this demo, you demonstrate how a token is stored client-side after successfully logging into the application.

## Instructions

* Run `npm install` and `npm run seed` to set up the database.

* Open the client-side [package.json](client/package.json) and explain that while we can't sign or verify a token in the client, we can check what information it holds and when it expires with the `jwt-decode` library.

* Open [auth.js](client/src/utils/auth.js) and explain the `AuthService` class:

  * When we log into the site, we need to store our access token somewhere so we can retrieve and include it with any request to our server. This suite of functionality helps us achieve that goal.

* Open [App.js](client/src/App.js) and explain the contents:

  * We now import the `setContext()` function from Apollo Client and implement it to retrieve the token and include it in the `headers` of any request to our server.

  * We don't have anything server-side yet that will verify this token, but we'll focus on that later.

* Open [Login.js](client/src/pages/Login.js) and explain the page's functionality:

  * When we fill out and submit this form to login, we execute the `login` mutation and receive a token in return, which we immediately store using our `AuthService` class functionality.
