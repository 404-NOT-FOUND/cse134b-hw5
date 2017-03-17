(function() {

Vue.use(VueFire);

var taggingDatabaseRef = database.ref('tagging');

var vm = new Vue({
    el: "#sidebar",
    data: {
        tags : [],
        games: '',
    },
    methods: {
        filterGame: function() {
            vm.games = '';
            console.log('hey');
            console.log('tags: ' + JSON.stringify(vm.tags));
            for (tag of vm.tags) {
                var tagRef = taggingDatabaseRef.child('tags/'+tag);
                tagRef.once('value', snap => {
                    console.debug(snap.key);
                    if (!snap.val()) { return; }
                    if (vm.games.length) {
                        console.debug('games and games[tag]');
                        console.debug(vm.games);
                        console.debug(Object.keys(snap.val()));
                        vm.games = this.intersect(vm.games, Object.keys(snap.val()));
                    } else {
                        vm.games = Object.keys(snap.val());
                    }
                    console.log(vm.games);
                });
            }
        },
        intersect: function(as, bs) {
            if (as.length < 1 || bs.length < 1) { return []; }
            return as.filter(elem => { return bs.indexOf(elem) >= 0; });
        },
    },
});

}());

