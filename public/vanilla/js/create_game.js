
var database = firebase.database();
var storage = firebase.storage();
var gamesStorageRef = storage.ref('games');
var gamesDatabaseRef = database.ref('games');

Vue.use(VueFire);

window.addEventListener('load', function() {
    var vm = new Vue({
        el: '#game_spec',
        data: {
            title     : '',
            desc      : '',
            imgFile   : '',
            player_min: '',
            player_max: '',
            age       : '',
        },
        firebase: {
            games: gamesDatabaseRef
        },
        methods: {
            addGame: function () {
                title      = this.title.trim();
                desc       = this.desc.trim();
                player_min = this.player_min.trim();
                player_max = this.player_max.trim();
                age        = this.age.trim();

                is_valid = title && desc && this.imgFile && player_min && player_max && age;

                if (player_min < 1 || parseInt(player_max) < player_min) {
                    alert('bad number of players');
                    is_valid = false;
                }

                if (is_valid) {
                    console.log('uploading image');
                    var imgRef = gamesStorageRef.child(title+'/image');
                    var uploadTask = imgRef.put(this.imgFile);
                    uploadTask.on('state_changed',
                        function progress(snap) {
                            var progress = (snap.bytesTransferred / snap.totalBytes) * 100;
                            console.log('uploading image: ' + progress);
                        },
                        function error(err) {
                            console.log('upload failed!');
                            console.log('game NOT created');
                        },
                        function complete() {
                            console.log('upload complete!');
                            var imgUrl = uploadTask.snapshot.downloadURL;
                            console.debug('imgUrl = ' + imgUrl);

                            console.debug('pushing');
                            gamesDatabaseRef.push({
                                'title':      title,
                                'desc':       desc,
                                'imgUrl':     imgUrl,
                                'player_min': player_min,
                                'player_max': player_max,
                                'age':        age,
                            }).then(console.log('pushed!'));
                        }
                    );
                }
            },
            onFileChange: function(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.imgFile = files[0];
            },
        }
    });
});

