(function() {

Vue.use(VueFire);

var gameDatabaseRef = database.ref('games');

var vm = new Vue({
    el: "#board_list",
    firebase: {
        games: gameDatabaseRef
    },
});

}());

