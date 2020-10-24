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

function callBooks(killerName) {
  $.ajax({
    url:
      "https://www.googleapis.com/books/v1/volumes?q=" +
      killerName +
      "+subject",
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var carousel = $("<div>")
      .addClass("carousel carousel-slider")
      .attr("id", "book-carousel");
    var responseArray = response.items;
    console.log(responseArray);
    responseArray.forEach(function (element) {
      var publishDate = moment(element.volumeInfo.publishedDate, "YYYY-MM-DD");
      $("<div>")
        .addClass("carousel-item")
        .html(
          '<div class="card"> <div class="card-image waves-effect waves-block waves-light"> <img class="activator" src="' +
            element.volumeInfo.imageLinks.smallThumbnail +
            '/400/200" alt="Cover for ' +
            element.volumeInfo.title +
            '"> </div> <div class="card-reveal"> <span class=card-title grey-text text-darken-4">' +
            element.volumeInfo.title +
            '<i class="material-icons right">close</i></span> <h6>By: ' +
            element.volumeInfo.authors[0] +
            "</h6> <h6>Publisher: " +
            element.volumeInfo.publisher +
            "</h6> <h6>Date Published: " +
            publishDate.format("MMMM Do, YYYY") +
            "</h6> </div>"
        )
        .appendTo(carousel);
      //   .addClass("carousel-item")
      //   .attr("id", "book-card")
      //   .val(element.volumeInfo.title)
      //   .appendTo("#eachBook");
      // $("<img>")
      //   .attr("src", element.volumeInfo.imageLinks.thumbnail)
      //   .attr("alt", "Cover for " + element.volumeInfo.title)
      // .appendTo("#book-card");
    });
    $("<div>").addClass("row").append(carousel).appendTo("#main");
    document.addEventListener("DOMContentLoaded", function () {
      var elems = document.querySelectorAll(".carousel");
      var instances = M.Carousel.init(elems, options);
    });
  });
}

function switchScreen() {}

function renderResults() {}
callBooks("Ted Bundy");
