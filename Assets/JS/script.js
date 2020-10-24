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
    $("#killer-bio").append(killerBio);
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
    killerImg = response.query.pages[firstResponse].thumbnail.source;
    var killerHtmlTag = $("<img>");
    killerHtmlTag.attr("src", killerImg);
    $("#killer-bio").prepend(killerHtmlTag);
  });
}
function callMovie(killerName) {
  var queryURL =
    "https://www.omdbapi.com/?t=" + killerName + "&y=&plot=short&apikey=41a87e5";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response)
      var movieRow = $("<div>").addClass("row").attr("id", "items-row");
      var responseArray = response.Search
      for (var i = 0; i < responseArray.length; i++) {
        var card = $("<div>").addClass("card");
        var img = $("<img>").addClass("card-image waves-effect waves-block waves-light activator").attr("src", responseArray[i].Poster).css({'width' : '400px' , 'height' : '200px'}).attr("alt", responseArray[i].title);
        if (responseArray[i].Poster === "N/A") {
          img.attr("src", "./assets/images/2297419_orig.jpg");
        }
        img.appendTo(card);
        card.appendTo(movieRow);
        
      }
      movieRow.appendTo(".container");
      
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

  ///clear elements
  switchScreen();

  returnWikiImage(killerSearchInput);
  returnWikiData(killerSearchInput);
  callMovie(killerSearchInput);

  function callTv() {}

  function callBooks(killerName) {
    $.ajax({
      url:
        "https://www.googleapis.com/books/v1/volumes?q=" +
        killerName +
        "+subject",
      method: "GET",
    }).then(function (response) {

      var row = $("<div>").addClass("row items-row");

      var responseArray = response.items;
      console.log(responseArray);
      responseArray.forEach(function (element, index) {
        var cardInfo =
          "<p>Synopsis: " + element.volumeInfo.description + "</p>";
        if (!element.volumeInfo.description) {
          cardInfo =
            "<h6>Published by " +
            element.volumeInfo.publisher +
            " on " +
            moment(element.volumeInfo.publishedDate, "YYYY-MM-DD").format(
              "MMMM Do, YYYY"
            ) +
            "</p>";
        }
        $("<div>")
          .addClass("card")
          .html(
            '<div class="card-image waves-effect waves-block waves-light"> <img class="activator" src="' +
              element.volumeInfo.imageLinks.thumbnail +
              '/400/200" alt="Cover for ' +
              element.volumeInfo.title +
              '"> </div> <div class="card-reveal" id="book-card-' +
              index +
              '"> <span class=card-title grey-text text-darken-4">' +
              element.volumeInfo.title +
              '<i class="material-icons right">close</i></span> <h6>By: ' +
              element.volumeInfo.authors[0] +
              "</h6>" +
              cardInfo +
              "</div>"
          )
          .appendTo(row);
      });
      row.appendTo(".container");
    });
  }


 

  switchScreen();

  function switchScreen() {
    event.preventDefault();
    $("#header-img").remove();
    $("#header").addClass("left");

  }

  function renderResults() {}
});
