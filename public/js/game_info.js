(function() {

Vue.use(VueFire);

var gameDatabaseRef = database.ref('games');
var ratingsDatabaseRef = database.ref('ratings');

var remove = function(gameTitle) {
    gameDatabaseRef.child(gameTitle).remove().then(
            function(success) {
                location.href = 'index.html';
            }, function(error) {
                if (error.code === 'PERMISSION_DENIED') {
                    alert('Error: You do not have permission to delete this game.');
                } else {
                    alert('Error: ' + error.message);
                }
            });
}

window.addEventListener('load', function () {
    args = parseArgs();

    var vm = new Vue({
        el: "#game_info",
        data: {
            isOwner: '',
            game   : '',
            rating : '',
            
            isUser: false,
            loginAlert: false,
            counter: 0,
            funInput: '',
            diffInput: '',
            chaInput: '',
        },
        created: function() {
            var gameRef = gameDatabaseRef.child(args['t']);
            gameRef.once('value', snap => {
                if (snap.val() == null) {
                    // game not found 
                    location.href = '404.html';
                }
                this.game = snap.val();
                this.game.title = snap.key;
                this.checkOwnership();
            });
            gameRef.on('child_changed', snap => {
                this.game[snap.key] = snap.val();
            });

            var ratingRef = ratingsDatabaseRef.child(args['t']);
            ratingRef.once('value', snap => {
                if (snap.val() == null) {
                    // game not found 
                    location.href = '404.html';
                }
                this.rating = snap.val();
                this.rating.title = snap.key;

            });
            ratingRef.on('child_changed', snap => {
                this.rating[snap.key] = snap.val();
            });

            console.log("this.rating: " + this.rating);
                console.log("this.rating.title: " + this.rating.title);
        },
        methods: {
            updateGame: function() {
                console.log('updating');
                console.log('redirecting to the edit page');
                location.href='editgame.html?t='+this.game.title;
            },
            deleteGame: function() {
                console.log('deleting');
                if (confirm('Are you sure you want delete this game for good?')) {
                    remove(args['t']);
                } else {
                    // Do nothing!
                }
            },
            checkOwnership: function() {
                auth.onAuthStateChanged(user => {
                    this.isOwner = user != null && user.uid === this.game.uid;
                });
            },
            checkUser: function() {
                auth.onAuthStateChanged(user => {
                    this.isUser = user != null;
                });

                if (!this.isUser) {
                    this.loginAlert = true;
                }
            },
            saveRating: function() {
                console.log("FunInput: " + this.funInput);
                console.log("DiffInput: " + this.diffInput);
                this.isUser = !this.isUser;

                var newFunTotal = (parseInt(this.funInput) + parseInt(this.rating.funTotal));
                var newFunNum = this.rating.funNum + 1;

                var newDiffTotal = (parseInt(this.diffInput) + parseInt(this.rating.diffTotal));
                var newDiffNum = this.rating.diffNum + 1;

                var newChaTotal = (parseInt(this.chaInput) + parseInt(this.rating.chaTotal));
                var newChaNum = this.rating.diffNum + 1;

                console.log("newFunTotal: " + newFunTotal);
                console.log("newFunNum: " + newFunNum);
                console.log("newDiffTotal: " + newDiffTotal);
                console.log("newDiffNum: " + newDiffNum);


                if(this.funInput) {
                    ratingsDatabaseRef.child(vm.game.title).update({
                        'funRating':  parseInt(newFunTotal / newFunNum),
                        'funTotal':   newFunTotal,
                        'funNum':     newFunNum,  
                    }).then(function(success) {
                        console.log("rating saved succesfully");
                    }, function(error) {
                        console.log("rating failed");
                    });
                }

                if(this.diffInput) {
                    ratingsDatabaseRef.child(vm.game.title).update({
                        'diffRating': parseInt(newDiffTotal / newDiffNum),
                        'diffTotal':  newDiffTotal,
                        'diffNum':    newDiffNum, 
                    }).then(function(success) {
                        console.log("rating saved succesfully");
                    }, function(error) {
                        console.log("rating failed");
                    });
                }

                if(this.chaInput) {
                    ratingsDatabaseRef.child(vm.game.title).update({
                        'chaRating': parseInt(newChaTotal / newChaNum),
                        'chaTotal':  newChaTotal,
                        'chaNum':    newChaNum, 
                    }).then(function(success) {
                        console.log("rating saved succesfully");
                    }, function(error) {
                        console.log("rating failed");
                    });
                }
            },
        },
    });
});

}());

