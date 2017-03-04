
(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDgNzcJS-zqj-I3yUUXJp7EXp-6Vd6XsOo",
    authDomain: "boardex-b8a9e.firebaseapp.com",
    databaseURL: "https://boardex-b8a9e.firebaseio.com",
    storageBucket: "boardex-b8a9e.appspot.com",
    messagingSenderId: "762957983152"
  };
  firebase.initializeApp(config);

  // Get elements
  const _email = document.getElementById('usr_email');
  const _password = document.getElementById('usr_pwd');
  const _loginBtn = document.getElementById('login_btn');
  const _signupBtn = document.getElementById('signup_btn');

  // when loginBtn is clicked, collect user info
  _loginBtn.addEventListener('click', e => {
      const email = _email.value;
      const password = _password.value;
      const auth = firebase.auth();
      const promise = auth.signInWithEmailAndPassword(email, password);
      promise.catch(e => console.log(e.message));
  })
}());

