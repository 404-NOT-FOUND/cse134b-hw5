
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
            game: {
                key: '',
                title     : '',
                desc      : '',
                img       : '',
                playerMin: '',
                playerMax: '',
                age       : '',
            },
            isUpdateMode: false,
        },
        firebase: {
            games: ref
        },
        created: function () {
            args = parseArgs();
            if (args.title != '') {
                console.debug('switched to update mode');
                this.isUpdateMode = true;

                ref.orderByChild('title').equalTo(args.title).on('child_added', snap => {
                    this.game = snap.val();
                    this.game.key = snap.key;
                    // TODO game not found
                });
            }
            else { console.debug('switched to add mode'); }
        },
        methods: {
            editgame: function () {
                console.log(this.game.desc);
                this.game.title      = this.game.title.trim();
                this.game.desc       = this.game.desc.trim();
                this.game.img        = this.game.img;
                this.game.playerMin  = this.game.playerMin.trim();
                this.game.playerMax  = this.game.playerMax.trim();
                this.game.age        = this.game.age.trim();

                is_valid = this.game.title && this.game.desc && 
                           this.game.img   && this.game.age  &&
                           this.game.playerMin && this.game.playerMax;

                if (this.game.playerMin < 1 || 
                    parseInt(this.game.playerMax) < this.game.playerMin
                   ) {
                    alert('bad number of players');
                    is_valid = false;
                }

                if (!is_valid) {
                    alert('Input is not valid. Edit failed.');
                    return;
                }

                if (this.isUpdateMode) {
                    this.updateGame();
                } else {
                    this.addGame();
                }
            },
            addGame: function () {
                console.debug('pushing');
                ref.push({
                    'title':      this.game.title,
                    'desc':       this.game.desc,
                    'img':        this.game.img,
                    'playerMin':  this.game.playerMin,
                    'playerMax':  this.game.playerMax,
                    'age':        this.game.age,
                }).then(console.log('pushed'));
            },
            updateGame: function() {
                console.debug('updating');
                ref.child(this.game.key).update({
                    'title':      this.game.title,
                    'desc':       this.game.desc,
                    'img':        this.game.img,
                    'playerMin':  this.game.playerMin,
                    'playerMax':  this.game.playerMax,
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
                    vm.game.img = e.target.result;
                };
                reader.readAsDataURL(file);
            },
        }
    });
});

