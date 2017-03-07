
(function() {
    const auth = firebase.auth();

    auth.onAuthStateChanged(user => {
        if (user) {
            console.log(user);
        } else {
            console.log('not logged in');
        }
    });
}());

