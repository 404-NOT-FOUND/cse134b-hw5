
(function() {
    var config = {
        apiKey: "AIzaSyDgNzcJS-zqj-I3yUUXJp7EXp-6Vd6XsOo",
        authDomain: "boardex-b8a9e.firebaseapp.com",
        databaseURL: "https://boardex-b8a9e.firebaseio.com",
        storageBucket: "boardex-b8a9e.appspot.com",
        messagingSenderId: "762957983152"
    };

    firebase.initializeApp(config);

    const auth = firebase.auth();

    const _signupBtn = document.getElementById('signup');
    const _signinBtn = document.getElementById('signin');
    const _signoutBtn = document.getElementById('signout');
    const _addgameBtn = document.getElementById('addgame');

    _signoutBtn.addEventListener('click', e => {
        auth.signOut();

        alert('You have succesfully signed out.');
    })

     _addgameBtn.addEventListener('click', e => {
        if(auth.currentUser) {
            document.location.href = 'newgame.html';
        } else {
            document.location.href = 'login.html?newgame';
        }
    })

    auth.onAuthStateChanged(user => {
        if (user) {
            console.log(user);
            console.log('logged in');

            _signupBtn.classList.add('hide');
            _signinBtn.classList.add('hide');
            _signoutBtn.classList.remove('hide');
        } else {
            console.log('not logged in');
            
            _signupBtn.classList.remove('hide');
            _signinBtn.classList.remove('hide');
            _signoutBtn.classList.add('hide');
        }
    });
}());

