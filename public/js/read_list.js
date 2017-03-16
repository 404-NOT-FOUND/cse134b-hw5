(function() {

Vue.use(VueFire);

var gameDatabaseRef = database.ref('games');
var taggingDatabaseRef = database.ref('tagging');

var vm = new Vue({
    el: "#gamelist",
    data: {
        tags    : [],
        titles  : '',
        isShowAll: true,
    },
    firebase: {
        games: gameDatabaseRef,
        allGames: gameDatabaseRef,
    },
    methods: {
        filterGame: function() {
            if (vm.tags.length < 1) {
                vm.isShowAll = true;
                vm.games = vm.allGames;
                return;
            }
            vm.isShowAll = false;
            vm.titles = '';
            vm.games  = '';
            console.log('tags: ' + JSON.stringify(vm.tags));
            for (tag of vm.tags) {
                var tagRef = taggingDatabaseRef.child('tags/'+tag);
                tagRef.once('value', snap => {
                    console.debug(snap.key);
                    if (!snap.val()) { return; }
                    if (vm.titles.length) {
                        console.debug('titles and titles[tag]');
                        console.debug(vm.titles);
                        console.debug(Object.keys(snap.val()));
                        vm.titles = this.intersect(vm.titles, Object.keys(snap.val()));
                    } else {
                        vm.titles = Object.keys(snap.val());
                    }
                    vm.updateGameList();
                    console.log(vm.titles);
                });
            }
        },
        intersect: function(as, bs) {
            if (as.length < 1 || bs.length < 1) { return []; }
            return as.filter(elem => { return bs.indexOf(elem) >= 0; });
        },
        updateGameList: function() {
            vm.games = [];
            for (title of vm.titles) {
                var gameRef = gameDatabaseRef.child(title);
                gameRef.once('value', snap => {
                    var game = snap.val();
                    game['.key'] = snap.key;
                    vm.games.push(game);
                });
            }
        },
    },
});

}());

