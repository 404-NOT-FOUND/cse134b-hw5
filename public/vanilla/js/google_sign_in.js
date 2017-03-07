
(function() {

const provider = new firebase.auth.GoogleAuthProvider();

// Get elements
const _email = document.getElementById('usr_email');
const _password = document.getElementById('usr_pwd');
const _loginBtn = document.getElementById('google_login_btn');

// when loginBtn is clicked, collect user info
_loginBtn.addEventListener('click', e => {
    firebase.auth().getRedirectResult().then(function(result) {
        // The signed-in user info.
        var user = result.user;
        if (!user) {
            // User not logged in, start login.
            console.log('redirect to sign in with google');
            firebase.auth().signInWithRedirect(provider);
        }
    }).catch(function(error) {
        var errorMessage = error.message;
        alert(errorMessage);
    });
});

}());

