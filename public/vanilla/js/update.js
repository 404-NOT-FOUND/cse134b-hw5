// Initialize Firebase
const config = {
    apiKey: "AIzaSyDgNzcJS-zqj-I3yUUXJp7EXp-6Vd6XsOo",
    authDomain: "boardex-b8a9e.firebaseapp.com",
    databaseURL: "https://boardex-b8a9e.firebaseio.com",
    storageBucket: "boardex-b8a9e.appspot.com",
    messagingSenderId: "762957983152"
};

var app = firebase.initializeApp(config);
var db = app.database();

// get elements;
const _board_game = document.getElementById('board_game');
const _ulist = document.getElementById('list');

// get the game db ref.
var dbRefBoardGame = db.ref('board_game');
var dbRefList = dbRefBoardGame.child('hobbies');

// sync
// dbRefBoardGame.on("value", snap => console.log( snap.val()) );
dbRefBoardGame.on('value', snap => {
    console.log(snap.val());
    _board_game.innerText = JSON.stringify(snap.val(), null, 3);
});

dbRefList.on('child_added', snap => {
    const li = document.createElement('li');
    li.innerText = snap.val();
    li.id = snap.key;
    _ulist.appendChild(li);
});

dbRefList.on('child_changed', snap => {
    const liChanged = document.getElementById(snap.key);
    liChanged.innerText = snap.val();
});

dbRefList.on('child_removed', snap => {
    const liToRemove = document.getElementById(snap.key);
    liToRemove.remove();
});


