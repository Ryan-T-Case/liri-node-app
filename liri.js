//Import necessary modules and files
require("dotenv").config();
var keys = require("./keys.js");
var request = require('request');
var moment = require('moment');
var dotenv = require('dotenv');
var fs = require("fs");
var Spotify = require('node-spotify-api');
//Access Spotify keys
//var spotify = new spotify(keys.spotify);

//Store console arguments to variables to be used in command functions
var command = process.argv[2];
var userQuery = process.argv[3];
var divider = "------------------------------------------------------------";
//Define functions for each of the commands

//This function will search the Bands in Town API for an artist and render associated info
var concertThis = function() {
    var index = process.argv.indexOf(userQuery);
    var artist = process.argv.slice(index).join(" ");
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            //Parse our returned data into an object, grabbing only the first result from our request
            var jsonData = JSON.parse(body)[0];
            //Convert the concert time into a readable MM/DD/YYYY format
            var convertedDate = moment(jsonData.datetime).format("L");
            //Take all data returned from our request and construct a string to be logged
            var concertData = `
            ${divider}
            Concert This!
            Band: ${artist}
            Venue: ${jsonData.venue.name}
            Venue Location: ${jsonData.venue.city}, ${jsonData.venue.country}
            Date of Event: ${convertedDate}
            ${divider}
            `;
            //Log our string to the console
            console.log(concertData);
            //Append our string to log.txt
            fs.appendFile("log.txt", concertData, function(error) {
                if (error) throw error;
            });

        }
    });
};

//Set conditionals that checks the command inputted by the user and runs the associated command function
if (command === "concert-this") {
    concertThis();
}

