
Vue.use(VueFire);
var db = firebase.database();
var ref = db.ref('games');

parse_args = function () {
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

window.addEventListener('load', function () {
    args = parse_args();
    // console.log(args.title);

    var vm = new Vue({
        el: "#game_info",
        data: {
            game      : '',
        },
        created: function() {
            var gameRef = ref.child(args.title);
            gameRef.once('value', snap => {
                console.debug(snap.val());
                // TODO game not found (snap.val() == null)
                this.game = snap.val();
                this.game.title = snap.key;
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
                ref.child(args.title).remove().then(
                function(success) {
                    document.location.href = 'index.html';
                }, function(error) {
                    if (error.code === 'PERMISSION_DENIED') {
                        alert('Error: You do not have permission to edit this game.');
                    } else {
                        alert('Error: ' + error.message);
                    }
                });
            },
        } // end of method
    }); // end of vue
}); // end of listener

