(function() {

Vue.use(VueFire);

const database      = firebase.database();
var gameDatabaseRef = database.ref('games');

var vm = new Vue({
    el: "#board_list",
    firebase: {
        games: gameDatabaseRef
    },
});

}());

