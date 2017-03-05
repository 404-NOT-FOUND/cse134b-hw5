
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
            title     : '',
            desc      : '',
            img       : '',
            player_min: '',
            player_max: '',
            age       : '',
        },
        created: function() {
            ref.orderByChild('title').equalTo(args.title).on('child_added', snap => {
                game = snap.val();
                console.log(game);
                this.title      = game.title;
                this.desc       = game.desc;
                this.img        = game.img;
                this.player_min = game.player_min;
                this.player_max = game.player_max;
                this.age        = game.age;
                // TODO game not found
            });
        }, // end of created

        methods: {
            updateGame: function() {
                console.debug(this.title);
                console.log(this.key);
                console.debug('updating');
            }

        } // end of method
    });
});



