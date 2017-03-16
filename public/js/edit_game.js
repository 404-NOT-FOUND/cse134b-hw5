
(function() {

var gamesStorageRef  = storage.ref('games');
var gamesDatabaseRef = database.ref('games');

Vue.use(VueFire);

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
            if (args.hasOwnProperty('t') && args['t'] != '') {
                console.log('switched to update mode');
                this.isUpdateMode = true;

                var gameRef = gamesDatabaseRef.child(args['t']);
                gameRef.once('value', snap => {
                    console.debug(snap.val());
                    if (snap.val() == null) {
                        // game not found
                        location.href = '404.html';
                    }
                    this.game = snap.val();
                    this.game.title = snap.key;
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

                isValid = this.game.title  && this.game.desc &&
                           this.game.imgUrl && this.game.age  &&
                           this.game.playerMin && this.game.playerMax;

                if (this.game.playerMin < 1 ||
                    this.game.playerMax < this.game.playerMin
                   ) {
                    alert('bad number of players');
                    isValid = false;
                }

                if (!isValid) {
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
                    }).then(function(success) {
                        alert('Game succesfully added.');
                        location.href = 'info.html?t=' + vm.game.title;
                    }, function(error) {
                        alert('An error occured when trying to add your game.');
                    });//console.log('pushed!'));
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
                    }).then(function(success) {
                        alert('Game succesfully updated.');
                        location.href = 'info.html?t=' + vm.game.title;
                    }, function(error) {
                        if(error.code === 'PERMISSION_DENIED') {
                            alert('Error: You do not have permission to edit this game. Redirecting to the home page.');
                            location.href = 'index.html';
                        } else {
                            alert('Error: ' + error.message);
                        }
                    });
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
                console.log('uploading original image');
                var imgRef = gamesStorageRef.child(auth.currentUser.uid+'/'+this.game.title+'/image');
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
                        vm.optimizeImg(uploadTask.snapshot.downloadURL, uploadCompleteCb);
                        vm.lastImg = vm.imgFile;
                    }
                );
            },
            optimizeImg: function(url, cb) {
                console.log('fetching optimized image');
                const resizer = "http://res.cloudinary.com/law4d4rh3/image/fetch/";
                const SIZE    = "h_280,";
                const QUALITY = "q_40,";
                const FORMAT  = "f_jpg/";
                optUrl = resizer+SIZE+QUALITY+FORMAT+escape(url);
                console.debug(optUrl);

                var img = new Image();
                img.setAttribute('crossOrigin', 'anonymous');
                img.onload = function () {
                    var canvas    = document.createElement("canvas");
                    canvas.width  = this.width;
                    canvas.height = this.height;

                    var canvasContext = canvas.getContext("2d");
                    canvasContext.drawImage(this, 0, 0);
                    console.debug('hehe');

                    canvas.toBlob(blob => {
                        console.debug(blob);
                        console.log('uploading optimized image');
                        var imgRef = gamesStorageRef
                        .child(auth.currentUser.uid)
                        .child(vm.game.title+'/image');
                    var uploadTask = imgRef.put(blob);
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
                            cb();
                        });
                    });

                };

                img.src = optUrl;
            },
        },
    });
});

}());

