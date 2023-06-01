// These samples are intended for Web so this import would normally be
// done in HTML however using modules here is more convenient for
// ensuring sample correctness offline.
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

function signInWithEmailPassword(email, password) {
  // var email = "test@example.com";
  // var password = "hunter2";
  // [START auth_signin_password]
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      return { errorCode, errorMessage };
    });
  // [END auth_signin_password]
}

function signUpWithEmailPassword(email, password) {
  // var email = "test@example.com";
  // var password = "hunter2";
  // [START auth_signup_password]
  console.log("sleivnslbvslbhslbhslbns");

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log("<=================> signed in");
      
      var user = userCredential.user;
      console.log("<=============================> user: ", user);
      return {
        status: "200",
        body: users,
      };
      // ...
    })
    .catch((error) => {
      console.log("<=================> error");
      var errorCode = error.code;
      var errorMessage = error.message;
      return { errorCode, errorMessage };
      // ..
    });
  // [END auth_signup_password]
}

function sendEmailVerification() {
  // [START auth_send_email_verification]
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(() => {
      // Email verification sent!
      // ...
    });
  // [END auth_send_email_verification]
}

function sendPasswordReset() {
  const email = "sam@example.com";
  // [START auth_send_password_reset]
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  // [END auth_send_password_reset]
}

// These samples are intended for Web so this import would normally be
// done in HTML however using modules here is more convenient for
// ensuring sample correctness offline.
// import firebase from "firebase/app";
// import "firebase/auth";

// ==========================================================================================
// Docs: Snippets in this file are "general purpose" and are used on more than one docs page
// ==========================================================================================

function makeGoogleCredential(googleUser) {
  // [START auth_make_google_credential]
  var credential = firebase.auth.GoogleAuthProvider.credential(
    googleUser.getAuthResponse().id_token
  );
  // [END auth_make_google_credential]
}

function makeFacebookCredential(response) {
  // [START auth_make_facebook_credential]
  var credential = firebase.auth.FacebookAuthProvider.credential(
    response.authResponse.accessToken
  );
  // [END auth_make_facebook_credential]
}

function makeEmailCredential(email, password) {
  // [START auth_make_email_credential]
  var credential = firebase.auth.EmailAuthProvider.credential(email, password);
  // [END auth_make_email_credential]
}

function signOut() {
  // [START auth_sign_out]
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
  // [END auth_sign_out]
}

function authStateListener() {
  // [START auth_state_listener]
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
  // [END auth_state_listener]
}

function currentUser() {
  // [START auth_current_user]
  const user = firebase.auth().currentUser;

  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // ...
  } else {
    // No user is signed in.
  }
  // [END auth_current_user]
}

function setLanguageCode() {
  // [START auth_set_language_code]
  firebase.auth().languageCode = "it";
  // To apply the default browser preference instead of explicitly setting it.
  // firebase.auth().useDeviceLanguage();
  // [END auth_set_language_code]
}

function authWithCredential(credential) {
  // [START auth_signin_credential]
  // Sign in with the credential from the user.
  firebase
    .auth()
    .signInWithCredential(credential)
    .then((result) => {
      // Signed in
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // ...
    });
  // [END auth_signin_credential]
}

function signInRedirect(provider) {
  // [START auth_signin_redirect]
  firebase.auth().signInWithRedirect(provider);
  // [END auth_signin_redirect]
}

module.exports = {
  signInWithEmailPassword,
  signUpWithEmailPassword,
  sendEmailVerification,
  sendPasswordReset,
};
