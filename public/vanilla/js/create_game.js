
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
                console.debug(this.title.trim()      );
                console.debug(this.desc.trim()       );
                console.debug(this.img               );
                console.debug(this.player_min.trim() );
                console.debug(this.player_max.trim() );
                console.debug(this.age.trim());

                if (this.title.trim() &&
                    this.desc.trim() &&
                    this.player_min.trim() &&
                    this.player_max.trim() &&
                    this.age.trim()
                   ) {
                       console.debug('pushing');
                       ref.push({
                           'title':      this.title,
                           'desc':       this.desc,
                           'img':        this.img,
                           'player_min': this.player_min,
                           'player_max': this.player_max,
                           'age':        this.age,
                       });
                   }
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

