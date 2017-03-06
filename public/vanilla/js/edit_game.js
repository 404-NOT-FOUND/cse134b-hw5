
var db = firebase.database();
var ref = db.ref('games');

Vue.use(VueFire);

parseArgs = function () {
    // parse argument
    // location.search => the search string ('?xxx=xxx')
    var parameters = location.search.substring(1).split('&');
    var pair = parameters[0].split('=');
    title = pair[1] ? unescape(pair[1]) : '';
    args = {
        title,
    };
    return args;
}

window.addEventListener('load', function() {
    var vm = new Vue({
        el: '#game_spec',
        data: {
            title     : '',
            desc      : '',
            img       : '',
            player_min: '',
            player_max: '',
            age       : '',
            game      : {
                key: '',
                title     : '',
                desc      : '',
                img       : '',
                player_min: '',
                player_max: '',
                age       : '',
            },
            isUpdateMode: false,
        },
        firebase: {
            games: ref
        },
        created: function () {
            console.debug('parsing args');
            args = parseArgs();
            console.debug('args: ' + JSON.stringify(args));
            if (args.title != '') {
                console.debug('switched to update mode');
                this.isUpdateMode = true;

                ref.orderByChild('title').equalTo(args.title).on('child_added', snap => {
                    this.game.key = snap.key;
                    // TODO game not found
                });
            }
            else { console.debug('switched to add mode'); }
        },
        methods: {
            editgame: function () {
                this.game.title      = this.title.trim();
                this.game.desc       = this.desc.trim();
                this.game.img        = this.img;
                this.game.player_min = this.player_min.trim();
                this.game.player_max = this.player_max.trim();
                this.game.age        = this.age.trim();

                is_valid = this.game.title && this.game.desc && 
                           this.game.img   && this.game.age  &&
                           this.game.player_min && this.game.player_max;

                if (this.game.player_min < 1 || 
                    parseInt(this.game.player_max) < this.game.player_min) {
                    alert('bad number of players');
                    is_valid = false;
                }

                if (!is_valid) {
                    alert('Input is not valid. Edit failed.');
                    return;
                }

                console.debug(this.game.title);
                if (this.isUpdateMode) {
                    this.updateGame();
                } else {
                    this.addGame();
                }
            },
            addGame: function () {
                console.debug('pushing');
                console.debug(this.game.title);
                ref.push({
                    'title':      this.game.title,
                    'desc':       this.game.desc,
                    'img':        this.game.img,
                    'player_min': this.game.player_min,
                    'player_max': this.game.player_max,
                    'age':        this.game.age,
                }).then(console.log('pushed'));
            },
            updateGame: function() {
                console.debug('updating');
                ref.child(this.game.key).update({
                    'title':      this.game.title,
                    'desc':       this.game.desc,
                    'img':        this.game.img,
                    'player_min': this.game.player_min,
                    'player_max': this.game.player_max,
                    'age':        this.game.age,
                }).then(console.log('updated'));
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                var image = new Image();
                var reader = new FileReader();
                var vm = this;
                reader.onload = e => {
                    vm.img = e.target.result;
                };
                reader.readAsDataURL(file);
            },
        }
    });
});

