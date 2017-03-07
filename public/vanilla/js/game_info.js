
Vue.use(VueFire);
var db = firebase.database();
var ref = db.ref('games');
const auth = firebase.auth();

var remove = function(gameTitle) {
    ref.child(gameTitle).remove().then(
            function(success) {
                location.href = 'index.html';
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

    var vm = new Vue({
        el: "#game_info",
        data: {
            isOwner: '',
            game   : '',
        },
        created: function() {
            var gameRef = ref.child(args['t']);
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
                    remove(args['t']);
                } else {
                    // Do nothing!
                }
            },
            checkOwnership: function() {
                auth.onAuthStateChanged(user => {
                    this.isOwner = user != null && user.uid === this.game.uid;
                });
            },
        } // end of method
    }); // end of vue
}); // end of listener

