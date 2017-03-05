Vue.use(VueFire);

// Initialize Firebase
const config = {
    apiKey: "AIzaSyDgNzcJS-zqj-I3yUUXJp7EXp-6Vd6XsOo",
    authDomain: "boardex-b8a9e.firebaseapp.com",
    databaseURL: "https://boardex-b8a9e.firebaseio.com",
    storageBucket: "boardex-b8a9e.appspot.com",
    messagingSenderId: "762957983152"
};

// set base database
var app = firebase.initializeApp(config);
var db = app.database();
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

