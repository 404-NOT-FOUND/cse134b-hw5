(function() {

Vue.use(VueFire);

var db = firebase.database();
var ref = db.ref('games');

var vm = new Vue({
    el: "#board_list",
    firebase: {
        games: ref
    },
});

}());

