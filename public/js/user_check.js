(function() {

auth.onAuthStateChanged(user => {
    if (!auth.currentUser) {
        alert('Please log in to add a game!');
        location.href = 'login.html?from=editgame';
    }
});

}());

