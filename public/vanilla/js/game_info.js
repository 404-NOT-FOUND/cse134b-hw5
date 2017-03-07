(function() {

Vue.use(VueFire);

const database      = firebase.database();
const auth          = firebase.auth();
var gameDatabaseRef = database.ref('games');

parseArgs = function () {
    // parse argument
    // location.search => the search string ('?xxx=xxx')
    var parameters = location.search.substring(1).split('&');
    var pair = parameters[0].split('=');
    title = unescape(pair[1]);
    args = {
        title,
    };
    return args;
}

var remove = function(gameTitle) {
    gameDatabaseRef.child(gameTitle).remove().then(
            function(success) {
                document.location.href = 'index.html';
            }, function(error) {
                if (error.code === 'PERMISSION_DENIED') {
                    alert('Error: You do not have permission to delete this game.');
                } else {
                    alert('Error: ' + error.message);
                }
            });
}

window.addEventListener('load', function () {
    args = parseArgs();
    // console.log(args.title);

    var vm = new Vue({
        el: "#game_info",
        data: {
            isOwner: '',
            game   : '',
        },
        created: function() {
            var gameRef = gameDatabaseRef.child(args.title);
            gameRef.once('value', snap => {
                console.debug(snap.val());
                // TODO game not found (snap.val() == null)
                this.game = snap.val();
                this.game.title = snap.key;
                this.checkOwnership();
            });
            gameRef.on('child_changed', snap => {
                this.game[snap.key] = snap.val();
            });
        }, // end of created
        methods: {
            updateGame: function() {
                console.log('updating');
                console.log('redirecting to the edit page');
                location.href='editgame.html?t='+this.game.title;
            },
            deleteGame: function() {
                console.log('deleting');
                if (confirm('Are you sure you want delete this game for good?')) {
                    console.debug("YES, remove it!");
                    remove(args.title);
                } else {
                    // Do nothing!
                }
            },
            checkOwnership: function() {
                auth.onAuthStateChanged(user => {
                    this.isOwner = user != null && user.uid === this.game.uid;
                });
            },
        }, // end of method
    }); // end of vue
}); // end of listener

}());

