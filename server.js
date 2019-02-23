// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Variables for JSON data
var reservations = [];
var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });

// Displays all reservations
app.get("/api/reservations", function(req, res) {
  return res.json(reservations);
});

// Displays all waitlist
app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

// Create New Reservations - takes in JSON input
app.post("/api/reservations", function(req, res){
  var newReservation = req.body;
  // newReservation = newReservation.replace(/\s+/g, "").toLowerCase();
  if (reservations.length >= 5) {
      waitlist.push(newReservation);
  }
  else {
      reservations.push(newReservation);
  }
  res.json(reservations);
});

// Create New Waitlist - takes in JSON input
app.post("/api/waitlist", function(req, res){
  var onWaitlist = req.body;
  // onWaitlist = onWaitlist.replace(/\s+/g, "").toLowerCase();
  waitlist.push(onWaitlist);
  res.json(onWaitlist);
});

// Deletes JSON data for tables and waitlist

app.delete("/api/reservations", function(req, res){
  reservations = [];
});

app.delete("/api/waitlist", function(req, res){
  waitlist = [];
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
