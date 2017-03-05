
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
    console.log(args.title);

    var vm = new Vue({
        el: "#game_info",
        data: {
            key       : '',
            game      : '',
        },
        created: function() {
            ref.orderByChild('title').equalTo(args.title).on('child_added', snap => {
                this.key = snap.key;
                this.game = snap.val();
                // TODO game not found
                ref.child(this.key).on('child_changed', snap => {
                    this.game[snap.key] = snap.val();
                });
            });
        }, // end of created
        methods: {
            updateGame: function() {
                console.log('updating');
                console.log('redirecting to the edit page');
                location.href='newgame.html';

                ref.child(this.key).update({
                    'desc': this.game.desc + ' hey',
                    'player_min': parseInt(this.game.player_min) + 1,
                }).then(console.log('updated'));
            }

        } // end of method
    }); // end of vue
}); // end of listener



