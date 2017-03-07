
(function() {

Vue.use(VueFire);

const recommendListLength = 3;
var gameDatabaseRef = database.ref('games');

var vm = new Vue({
    el: '#recommend_list',
    data: {
        games: [],
    },
    created: function() {
        var recommendGamesRef = gameDatabaseRef.orderByKey().limitToLast(recommendListLength);
        recommendGamesRef.on('child_added', snap => {
            var game = snap.val();
            game.title = snap.key;
            this.games.push(game);
        });
    },
});

}());

