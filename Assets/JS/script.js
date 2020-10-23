//OMDB movie call
function callMovie() {
    var title = "ted+bundy";
    var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=41a87e5";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      console.log(response.Title);
      $("<div>").addClass("row").attr("id", "eachMovie").appendTo("#main");
      $("<div>").addClass("col s4").attr("id", "movie-card").appendTo("#eachMovie");
      $("<img>").attr("src", response.Poster).appendTo("#movie-card");
    });
}

function returnWikiData(killername) {}

function returnWikiImage(killerimage) {}

function callTv() {}

function callBooks() {}

function switchScreen() {}

function renderResults() {}





