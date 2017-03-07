(function() {

const auth = firebase.auth();
auth.onAuthStateChanged(user => {
    if (user) {
        args = parseArgs();
        if (!args.hasOwnProperty('from')) {
            location.href = 'index.html';
        } else if(args['from'] === 'editgame') {
            location.href = 'editgame.html';
        }
    } else {
        console.log('not logged in');
    }
});

}());
