var showCounter = 0; //count the number of shows



// initialize variables after page loads
window.onload = function() {
   closeLightBox();
} // window.onload


// get data from TV Maze
function fetchData() {
  document.getElementById("main").innerHTML = "";
  
  var search = document.getElementById("search").value;  
    
  fetch('http://api.tvmaze.com/search/shows?q=' + search)
    .then(response => response.json())
    .then(data => updatePage(data) 
    );
} // window.onload 
 

// change the activity displayed 
function updatePage(data) {
  console.log(data); // prints json in console
  var tvshow; 
  for (tvshow in data) {
    
    createTVShow(data[tvshow]);
  } // for


} // updatePage

// returns a string of formatted genres
function showGenres(genres) {
   var g;
   var output = "<ul>";
   for (g in genres) {
      output += "<li>" + genres[g] + "</li>"; 
   } // for       
   output += "</ul>";
   return output; 
} // showGenres

// constructs one TV show entry on homepage
function createTVShow (tvshowJSON) {
    var elemMain = document.getElementById("main");
    
    var elemDiv = document.createElement("div");
    var elemImage = document.createElement("img");
    
    var elemShowTitle = document.createElement("h2");
    elemShowTitle.classList.add("showtitle"); // add a class to apply css
    
    var elemGenre = document.createElement("div");
    var elemRating = document.createElement("div");
    var elemSummary = document.createElement("div");
    
    // add JSON data to elements
    elemImage.src = tvshowJSON.show.image.medium;
    elemShowTitle.innerHTML = tvshowJSON.show.name;
    elemGenre.innerHTML = showGenres(tvshowJSON.show.genres);
    elemRating.innerHTML = tvshowJSON.show.rating.average;
    elemSummary.innerHTML = tvshowJSON.show.summary;
    
       
    // add 5 elements to the div tag
    elemDiv.appendChild(elemShowTitle);  
    elemDiv.appendChild(elemGenre);
    elemDiv.appendChild(elemRating);
    elemDiv.appendChild(elemSummary);
    elemDiv.appendChild(elemImage);
    
    // get id of show and add episode list
    var showId = tvshowJSON.show.id;
    fetchEpisodes(showId, elemDiv);
    
    // add this entry to main
    elemMain.appendChild(elemDiv);
    
} // createTVShow

// fetch episodes for a given tv show id
function fetchEpisodes(showId, elemDiv) {
    
    
  console.log("fetching " + showId);
  
  fetch('http://api.tvmaze.com/shows/' + showId + '/episodes')
    .then(response => response.json())
    .then(data => showEpisodes(data, elemDiv));
    
} // fetch episodes


// show episodes
function showEpisodes (data, elemDiv) {
    console.log("episodes");
    console.log(data); 
    showCounter ++;
    var elemEpisodes = document.createElement("div");
    var output = "<ol>";
    for (episode in data) {
		if (data [episode].image) {
		var image = data[episode].image.medium;
		var name = (data[episode].name).replaceAll("'","&apos;").replaceAll('"','\\"');
		var season = data[episode].season;
		var number = data[episode].number;
		var summary = (data[episode].summary).replaceAll("'","&apos;").replaceAll('"','\\"');
		output += "<li><a href='javascript:showLightBox(\"";
		output += name + "\",\"";
		output += image;
		output += "\",\"";
		output += season;
		output += "\",\"";
		output += number;
		output += "\",\"" + summary + "\")'>";
		output += name;
		output += "</a></li>";	
    }
	}
    output += "</ol>";
    elemEpisodes.innerHTML = output;
    elemDiv.appendChild(elemEpisodes);
        
} // showEpisodes

// show a lightbo displaying the episode data found in episodeJSON
function showLightBox(name, img, season, number, summary){
     document.getElementById("lightbox").style.display="block";
     document.getElementById("message").innerHTML = "<img src='" + img + "' alt='episode image'>";    
	document.getElementById("message").innerHTML += "<h5>" + "Episode Name: " + name + "</h5>";
	document.getElementById("message").innerHTML += "<h5>" + "Season: " + season + "</h5>";
	document.getElementById("message").innerHTML += "<h5>" + "Number: " + number + "</h5>";
	document.getElementById("message").innerHTML += "<h5>" + "Summary: " + summary + "</h5>";
	 
} // showLightBox

 // close the lightbox
 function closeLightBox(){
     document.getElementById("lightbox").style.display="none";
 } // closeLightBox 


/*
var g;
   var output = "<select id='episodes' name='episodes'>";
   for (g in genres) {
      output += "<option value='" + + "'>" + genres[g] + "</li>"; 
   } // for       
   output += "</select>";
   return output; 
*/





