
var database = firebase.database();
var storage = firebase.storage();
var gamesStorageRef = storage.ref('games');
var gamesDatabaseRef = database.ref('games');
const auth = firebase.auth();

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

auth.onAuthStateChanged(user => {
    var vm = new Vue({
        el: '#game_spec',
        data: {
            lastImg: '',
            imgFile: '',
            game: {
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

                var gameRef = gamesDatabaseRef.child(args.title);
                gameRef.once('value', snap => {
                    this.game = snap.val();
                    this.game.title = snap.key;
                    // TODO game not found
                });
            }
            else { console.log('switched to add mode'); }
        },
        methods: {
            editgame: function () {
                this.game.title      = this.game.title.trim();
                this.game.desc       = this.game.desc.trim();
                this.game.playerMin  = parseInt(this.game.playerMin);
                this.game.playerMax  = parseInt(this.game.playerMax);
                this.game.age        = this.game.age.trim();

                is_valid = this.game.title  && this.game.desc &&
                           this.game.imgUrl && this.game.age  &&
                           this.game.playerMin && this.game.playerMax;

                if (this.game.playerMin < 1 ||
                    this.game.playerMax < this.game.playerMin
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
                requireImg = function () {
                    console.log('missing image file');
                };
                add = function () {
                    console.log('pushing');
                    gamesDatabaseRef.child(vm.game.title).set({
                        'desc':       vm.game.desc,
                        'imgUrl':     vm.game.imgUrl,
                        'playerMin':  vm.game.playerMin,
                        'playerMax':  vm.game.playerMax,
                        'age':        vm.game.age,
                        'uid':        auth.currentUser.uid,
                    }).then(console.log('pushed!'));
                };
                this.uploadImageWithCallBack(requireImg, add);
            },
            updateGame: function() {
                update = function () {
                    console.log('updating');
                    gamesDatabaseRef.child(vm.game.title).update({
                        'desc':       vm.game.desc,
                        'imgUrl':     vm.game.imgUrl,
                        'playerMin':  vm.game.playerMin,
                        'playerMax':  vm.game.playerMax,
                        'age':        vm.game.age,
                    }).then(console.log('updated'));
                };
                this.uploadImageWithCallBack(update, update);
            },
            onGameImageChange: function(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length) {
                    vm.game.imgUrl = '';
                    return;
                }
                this.imgFile = files[0];
                var reader = new FileReader();
                reader.onload = function(e) {
                    vm.game.imgUrl = e.target.result;
                }
                reader.readAsDataURL(this.imgFile);
            },
            uploadImageWithCallBack: function(noImgCb, uploadCompleteCb) {
                if (!this.imgFile) {
                    noImgCb();
                    return;
                }
                if (this.imgFile == this.lastImg) {
                    // already uploaded
                    uploadCompleteCb();
                    return;
                }
                console.log('uploading image');
                var imgRef = gamesStorageRef.child(this.game.title+'/image');
                var uploadTask = imgRef.put(this.imgFile);
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
                        uploadCompleteCb();
                        vm.lastImg = vm.imgFile;
                    }
                );
            },
        }
    });
});

