function returnWikiData(killerName) {
  var queryURL =
    "https://en.wikipedia.org/w/api.php?action=query&titles=" +
    killerName +
    "&prop=extracts&format=json&exintro=1&origin=*";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var responseKey = Object.keys(response.query.pages);
    var firstResponse = responseKey[0];
    var killerBio = response.query.pages[firstResponse].extract;
    console.log(killerBio);
  });
}

function returnWikiImage(killerName) {
  var queryURL =
    "https://commons.wikimedia.org/w/api.php?prop=pageimages|info|redirects&gsrnamespace=6&pithumbsize=250&action=query&inprop=url&redirects=&format=json&generator=search&gsrsearch=intitle:" +
    killerName +
    "&gsrlimit=5&origin=*";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var responseKey = Object.keys(response.query.pages);
    var firstResponse = responseKey[0];
    //url of killer's Image
    killerImg = response.query.pages[firstResponse].canonicalurl;
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

//On Buttion Click to run search functions
$("#search-btn").on("click", function (event) {
  event.preventDefault();

  //set variable for what person the end user is searching for
  var killerSearchInput = $("#search-bar").val().trim();
  const str = killerSearchInput;
  //Wiki doesnt like it when we dont capitlize the first word of the search this fixes that
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const caps = str.split(" ").map(capitalize).join(" ");
  killerSearchInput = caps;

  returnWikiImage(killerSearchInput);
  returnWikiData(killerSearchInput);

  function callTv() {}

  function callBooks() {}

  function switchScreen() {}

  function renderResults() {}
});
