
(function() {
    const auth = firebase.auth();

    const _signupBtn = document.getElementById('signup');
    const _signinBtn = document.getElementById('signin');
    const _signoutBtn = document.getElementById('signout');

    _signoutBtn.addEventListener('click', e => {
        auth.signOut();

        alert('You have succesfully signed out.');
        // TODO redirect to home page from editgame.html
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

