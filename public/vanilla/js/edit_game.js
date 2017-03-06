
var database = firebase.database();
var storage = firebase.storage();
var gamesStorageRef = storage.ref('games');
var gamesDatabaseRef = database.ref('games');

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
            imgFile: '',
            game: {
                key       : '',
                title     : '',
                desc      : '',
                imgUrl    : '',
                playerMin : '',
                playerMax : '',
                age       : '',
            },
            isUpdateMode: false,
        },
        firebase: {
            games: gamesDatabaseRef
        },
        created: function () {
            args = parseArgs();
            if (args.title != '') {
                console.log('switched to update mode');
                this.isUpdateMode = true;

                gamesDatabaseRef.orderByChild('title').equalTo(args.title).on('child_added', snap => {
                    this.game = snap.val();
                    this.game.key = snap.key;
                    // TODO game not found
                });
            }
            else { console.log('switched to add mode'); }
        },
        methods: {
            editgame: function () {
                this.game.title      = this.game.title.trim();
                this.game.desc       = this.game.desc.trim();
                this.game.playerMin  = this.game.playerMin.trim();
                this.game.playerMax  = this.game.playerMax.trim();
                this.game.age        = this.game.age.trim();

                is_valid = this.game.title  && this.game.desc &&
                           this.game.imgUrl && this.game.age  &&
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
                this.uploadGameImage();
                console.log('pushing');
                gamesDatabaseRef.push({
                    'title':      vm.game.title,
                    'desc':       vm.game.desc,
                    'imgUrl':     vm.game.imgUrl,
                    'playerMin':  vm.game.playerMin,
                    'playerMax':  vm.game.playerMax,
                    'age':        vm.game.age,
                }).then(console.log('pushed!'));
            },
            updateGame: function() {
                this.uploadGameImage();
                console.log('updating');
                gamesDatabaseRef.child(this.game.key).update({
                    'title':      this.game.title,
                    'desc':       this.game.desc,
                    'imgUrl':     this.game.imgUrl,
                    'playerMin':  this.game.playerMin,
                    'playerMax':  this.game.playerMax,
                    'age':        this.game.age,
                }).then(console.log('updated'));
            },
            onGameImageChange: function(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.imgFile = files[0];
                var reader = new FileReader();
                var vm = this;
                reader.onload = function(e) {
                    vm.game.imgUrl = e.target.result;
                }
                reader.readAsDataURL(this.imgFile);
            },
            uploadGameImage: function() {
                if (!this.imgFile)
                    return;
                console.log('uploading image');
                var imgRef = gamesStorageRef.child(this.game.title+'/image');
                var uploadTask = imgRef.put(this.imgFile);
                var vm = this;
                uploadTask.on('state_changed',
                    function progress(snap) {
                        var progress = (snap.bytesTransferred / snap.totalBytes) * 100;
                        console.log('uploading image: ' + progress);
                    },
                    function error(err) {
                        console.log('upload failed!');
                    },
                    function complete() {
                        console.log('upload complete!');
                        vm.game.imgUrl = uploadTask.snapshot.downloadURL;
                    }
                );
            },
        }
    });
});

