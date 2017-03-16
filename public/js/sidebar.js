(function() {

Vue.use(VueFire);

var taggingDatabaseRef = database.ref('tagging');

var vm = new Vue({
    el: "#sidebar",
    data: {
        tags : {},
        games: [],
    },
    methods: {
        filterGame: function() {
            console.log('hey');
            console.log('tags: ' + JSON.stringify(vm.tags));
            for (category in vm.tags) {
                var tag = vm.tags[category];
                var tagRef = taggingDatabaseRef.child('tags/'+tag);
                tagRef.once('value', snap => {
                    console.debug(snap.key);
                    if (!snap.val()) { return; }
                    if (vm.games.length) {
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

