//OMDB movie call
// function callMovie() {
//     //var title = "" This needs the users input before it can be implemented
//     var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=41a87e5";
//     $.ajax({
//         url: queryURL,
//         method: "GET",
//     }).then(function(res) {
//         console.log(res)
//         var availableMovies = {};
//         for (var i = )
//         $("<div>").addClass("").attr("id", "movie-list").appendTo("#movie-div");

//     })
// }

function returnWikiData(killerName) {}

function returnWikiImage(killerName) {
  var queryURL =
    "https://en.wikipedia.org/w/api.php?action=query&titles=" +
    killerName +
    "&prop=pageimages&format=json&pithumbsize=250&origin=*";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var responseKey = Object.keys(response.query.pages);
    var firstResponse = responseKey[0];

    killerImg = response.query.pages[firstResponse].thumbnail.source;
    console.log(killerImg);
  });
}
function callMovie() {
  var title = "ted+bundy";
  var queryURL =
    "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=41a87e5";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(response.Title);
    $("<div>").addClass("row").attr("id", "eachMovie").appendTo("#main");
    $("<div>")
      .addClass("col s4")
      .attr("id", "movie-card")
      .appendTo("#eachMovie");
    $("<img>").attr("src", response.Poster).appendTo("#movie-card");
  });
}

returnWikiImage("Ted Bundy");
/////"https://en.wikipedia.org/w/api.php?action=query&titles=Ted Bundy&prop=extracts&format=json&exintro=1&origin=*";}

function callTv() {}

function callBooks() {}

function switchScreen() {}

function renderResults() {}
