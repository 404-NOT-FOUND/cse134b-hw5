(function() {

Vue.use(VueFire);

var gamesDatabaseRef = database.ref('games');

var vm = new Vue({
	el: '#searchbar',
	data: {
		searchString: '',
		gamesList: [],
		loadedGamesList: [],
		displayList: [],
		isSearch: false,
	},
	created: function() {
		gamesDatabaseRef.on('value', gameList => {
			let games = [];
			gameList.forEach(game => {
				//console.log("game: " + game.key);
				games.push(game.key);
			});

			this.gamesList = games;
			this.loadedGamesList = games;
		});
	},
	methods: {
		initializeItems: function() {
			this.gamesList = this.loadedGamesList;
			//console.log("gamesList: " + gamesList);
		},
		search: function() {
			var searchString = this.searchString;
			this.isSearch = true;

			this.initializeItems();

			if (!searchString) {
				this.isSearch = false;
				return;
			}

			searchString = searchString.trim().toLowerCase();

			this.gamesList = this.gamesList.filter((val) => {
				//console.log("filtering");
				if (searchString) {
					if (val.toLowerCase().indexOf(searchString) > -1) {
						//console.log("found " + val.toLowerCase());
						return true;
					} else {
						//console.log("not found");
						return false;
					}
				}
			})

			console.log("final list: " + this.gamesList);
		},
		submitSearch: function() {
			//alert(this.gamesList[0]);
			location.href = 'info.html?t=' + this.gamesList[0];
			
		},
	},

});


}());
