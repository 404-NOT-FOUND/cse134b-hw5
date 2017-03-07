
(function() {

auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user);
        console.log('logged in');
        if(location.search === '?newgame'){
            location.href = 'editgame.html';
        } else {
            location.href = 'index.html';
        }
    } else {
        console.log('not logged in');
    }
});

}());
