(function() {
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyDgNzcJS-zqj-I3yUUXJp7EXp-6Vd6XsOo",
    authDomain: "boardex-b8a9e.firebaseapp.com",
    databaseURL: "https://boardex-b8a9e.firebaseio.com",
    storageBucket: "boardex-b8a9e.appspot.com",
    messagingSenderId: "762957983152"
  };
  firebase.initializeApp(config);

  // get elements;
  const _preObject = document.getElementById('object');

  // create ref
  var dbRefObject = firebase.database().ref().child('object');

  // sync
  dbRefObject.on("value", snap => console.log( snap.val()) );

}());
