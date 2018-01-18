
require("dotenv").config(); //loads files from .env file

var keys = require("./keys.js");//gets the keys from the keys.js files

var Twitter = require("twitter");

var Spotify = require("node-spotify-api");

var request = require("request"); //sends request to OMDB API-Open Movie Database

var fs = require("fs"); //fs is a node package for reading and writing files.



//command functions
var liriGets = function(caseData, functionData) {
    switch (caseData) {
      case "my-tweets":
      getMyTweets();
        break;
      case "spotify-this-song":
        getMeSpotify();
        break;
      case "movie-this":
        getMeMovie();
        break;
      case "do-what-it-says":
        doWhatItSays();
        break;
      default:
        console.log("Do you Flix?");
    }
  };
  
  // function that takes in the command liri executes
  var pushThis = function(argOne, argTwo) {
    liriGets(argOne, argTwo);
  };
  
 //executes liri
  pushThis(process.argv[2], process.argv[3]);



//function to get tweets
function getMyTweets() {
    var client = new Twitter(keys.twitter);
    var params = {
      screen_name: "Neptune"
    };
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
      if (!error) {
        for (var i = 0; i < 20; i++) {
          console.log(tweets[i].created_at);
          console.log("The twit:");
          console.log(tweets[i].text);
        }
      }
    });
  };

//spotify keys 
var spotify = new Spotify({
  id: "bfee9b0c75be4a08b797c82cc2f8a2c7",
  secret: "542eb4b404254e26b4697d3b4e6754ed"
});




var getArtistNames = function(artist) {
  return artist.name;
};


var getMeSpotify = function(nameOfSong) {
  if (nameOfSong === undefined) {
    nameOfSong = "The Sign";
  }

  spotify.search( {

      type: "track",
      query: nameOfSong
    },
    function(err, data) {
      if (err) {
        console.log("Error! Error!: " + err);
        return;
      }

      var songs = data.tracks.items;

      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("artist(s): " + songs[i].artists.map(getArtistNames));
        console.log("song name: " + songs[i].name);
        console.log("preview song: " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
      }
    }
  );
};


function getMeMovie(movieName) {
  if (movieName === undefined) {
    movieName = "Mr Nobody";
  }

  var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot&apikey=trilogy";

  request(movieUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var movieData = JSON.parse(body);

      console.log("Title: " + movieData.Title);
      console.log("Year: " + movieData.Year);
      console.log("Rated: " + movieData.Rated);
      console.log("IMDB Rating: " + movieData.imdbRating);
      console.log("Country: " + movieData.Country);
      console.log("Language: " + movieData.Language);
      console.log("Plot: " + movieData.Plot);
      console.log("Actors: " + movieData.Actors);
      console.log("Rotton Tomatoes URL: " + movieData.tomatoURL);
    }
  });
};


var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      liriGets(dataArr[0], dataArr[1]);
    }
    else if (dataArr.length === 1) {
      liriGets(dataArr[0]);
    }
  });
};















