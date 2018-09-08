// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains
// 3. Create a way to retrieve train info from the train database - then update the html + update the database.
// 4. Create a way to determine when the next train will be in the station.
// 5. Create a way to calculate the minutes remaining on each train. Using difference between start and current time.
//    Then use moment.js formatting to set difference in minutes.

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDFSxUnUONqqOl3MmAoCCq2t8berb5ZQkU",
    authDomain: "train-scheduler-451bd.firebaseapp.com",
    databaseURL: "https://train-scheduler-451bd.firebaseio.com",
    projectId: "train-scheduler-451bd",
    storageBucket: "train-scheduler-451bd.appspot.com",
    messagingSenderId: "225948509234"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainStart = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
    var trainRate = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: destination,
      start: trainStart,
      rate: trainRate
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.rate);

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});


// 3. Create a way to retrieve train info from the train database - then update the html + update the database.
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainRate = childSnapshot.val().rate;
  
    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(trainStart);
    console.log(trainRate);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(trainRate)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });