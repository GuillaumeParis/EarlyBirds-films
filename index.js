/**
 * @author Guillaume PARIS 
 * @mail paris.guillaume@hotmail.fr
 * Technical test for Early Birds
 * 
 */


var app = {
	url : "https://api.themoviedb.org/3/movie/upcoming?api_key=e082a5c50ed38ae74299db1d0eb822fe",
	imageWidth : 1000,
	imagesPath : "https://image.tmdb.org/t/p/w",
	films : {},
	/*
	 * Create a "tile" for each film
	 */
	appendTile : function(id, title,description) {
		$("#films").append(
				"<li class='tile' id='tile_" + id + "'>" 
				+ "<h1 class='title'>" + title + "</h1>"
				+ "<p class='vote'></p>"
				+ "<p class='overview'>" + description 
				+ "</p>" 
				+ "<p class='numberCircle'>"+(parseInt(id)+1)+"</p>"
				+ "</li>");
	},
	/*
	 * Get the films description from app.url and stores it into the app object and then create the films content.
	 */
	getFilms : function() {
		$.get(app.url,function(data) {
			app.films = data;
			app.printFilms();
			
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
			console.error("ERROR : Cannot get the content from "+ app.url + "\n" + errorThrown);
		});

	},
	/*
	 * Print the stars according to the notation (rounded to the closer Int).
	 */
	addNotation : function(id,notation){
		var starsNb = Math.round(notation/2);
		var stars ="";
		
		if(starsNb>5 || starsNb<0){
			console.error("ERROR : Notation should be between 0 and 10");
		}
		
		for(var k =1 ; k<=5; k++){
			if(starsNb>=k){stars += "<span class='star'>&#9733;</span>";}
			else{stars += "<span class='star'>&#9734;</span>";}	
		}
		$("#tile_"+id).find(".vote").append(
			stars +"<span class='notation' id='note'>("+notation+")</span>"
		);
	},
	/*
	 * 1. Create the tile template and fill it with the data
	 * 2. Add the corresponding background image
	 * 3. Format the notation with stars
	 */
	printFilms : function() {
		for ( var id in app.films.results) {
			app.appendTile(id, app.films.results[id].title, app.films.results[id].overview);
			$("#tile_" + id).css(
					'background-image',
					'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(' + app.imagesPath + app.imageWidth
							+ app.films.results[id].backdrop_path + ')');
			app.addNotation(id,app.films.results[id].vote_average);
		}
	},
	prev : function() {
		$("#films").animate({
			marginLeft : app.imageWidth
		}, 600, function() {
			$("#films").css({marginLeft : 0}, 600);
			$("#films").find("li:last").after($(this).find("li"));
		});
	},
	next : function() {
		$("#films").animate({
			marginLeft : app.imageWidth * -1
		}, 600, function() {
			$("#films").css({marginLeft : 0}, 600);
			$("#films").find("li:last").after($(this).find("li:first"));
		});
	}
};

$(document).ready(function() {
	console.log("Device Ready");
	app.getFilms();
});