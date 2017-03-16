(function() {

Vue.use(VueFire);

var gameDatabaseRef = database.ref('games');

var remove = function(gameTitle) {
    gameDatabaseRef.child(gameTitle).remove().then(
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
            isUser : '',
            isOwner: '',
            game   : '',
            tags   : [],
            newtag : '',
        },
        created: function() {
            var gameRef = gameDatabaseRef.child(args['t']);
            gameRef.once('value', snap => {
                if (snap.val() == null) {
                    // game not found 
                    location.href = '404.html';
                }
                this.game = snap.val();
                this.game.title = snap.key;
                this.checkOwnership();
            });
            gameRef.on('child_changed', snap => {
                this.game[snap.key] = snap.val();
            });
        },
        watch: {
            'newtag': function(val, oldVal) {
                if (val) {
                    this.tags.push(val);
                }
                // reset newtag selector
                this.newtag = '';
            },
        },
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
                    this.isUser  = user != null;
                    this.isOwner = user != null && user.uid === this.game.uid;
                });
            },
        },
    });
});

}());

