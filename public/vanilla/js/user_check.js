(function() {

const auth = firebase.auth();

auth.onAuthStateChanged(user => {
    if (!auth.currentUser) {
        alert('Please log in to continue!');
        location.href = 'login.html';
    }
});

}());
