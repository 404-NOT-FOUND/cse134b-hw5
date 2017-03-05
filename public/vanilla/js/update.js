Vue.use(VueFire);

// set base database
var db = firebase.database();
var ref = db.ref('games');

window.addEventListener('load', function () {
    var vm = new Vue({
        el: "#game_info",
        data: {
            title   : 'hey',
            desc    : '',
            img_url : '',
        },

        firebase: {
            games: ref
        },

        methods: {
            updateGame: function() {
                console.debug(this.title);
                console.debug('updating');
                // ref.child(key).update( {"title": "YOYOYO!" } )
            }

        } // end of method

    }); // end of new Vue

}); // end of listener

