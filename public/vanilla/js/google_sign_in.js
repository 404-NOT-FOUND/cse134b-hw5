
(function() {
    // Initialize Firebase


    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    // Get elements
    const _email = document.getElementById('usr_email');
    const _password = document.getElementById('usr_pwd');
    const _loginBtn = document.getElementById('google_login_btn');

    // when loginBtn is clicked, collect user info
    _loginBtn.addEventListener('click', e => {

        firebase.auth().getRedirectResult().then(function(result) {
           /*if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
            }
            // The signed-in user info.
            var user = result.user;*/
            if (!user) {
                // User not logged in, start login.
                console.log('redirect to sign in with google');
                firebase.auth().signInWithRedirect(provider);
            } else {
                // user logged in, go to home page.
                console.log('redirect to home page');
                document.location.href = 'index.html';
            }
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
        });
    })
}());

