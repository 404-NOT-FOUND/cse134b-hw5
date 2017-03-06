
var db = firebase.database();
var ref = db.ref('games');

Vue.use(VueFire);

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
        },
        firebase: {
            games: ref
        },
        methods: {
            addGame: function () {
                title      = this.title.trim();
                desc       = this.desc.trim();
                img        = this.img;
                player_min = this.player_min.trim();
                player_max = this.player_max.trim();
                age        = this.age.trim();

                is_valid = title && desc && img && player_min && player_max && age;

                if (player_min < 1 || parseInt(player_max) < player_min) {
                    alert('bad number of players');
                    is_valid = false;
                }

                if (is_valid) {
                    console.debug('pushing');
                    ref.push({
                        'title':      title,
                        'desc':       desc,
                        'img':        img,
                        'player_min': player_min,
                        'player_max': player_max,
                        'age':        age,
                    });
                }
            },
            onFileChange: function(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage: function(file) {
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

