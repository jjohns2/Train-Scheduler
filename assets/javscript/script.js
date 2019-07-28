// Initialize Firebase
var config = {
    apiKey: "AIzaSyBmIcNd-uONy9jvAi1_dwtao0ThrQNeMpI",
    authDomain: "choo-choo-scheduler.com",
    databaseURL: "https://choo-choo-scheduler.firebaseio.com",
    storageBucket: "choo-choo-scheduler.appspot.com",
    messagingSenderId: "742250943148",
    projectID: "choo-choo-scheduler"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

//when the Button is Hit the Train is Added
//takes in input
$("#submitclick").click(function () {
var trainName = $("#trainnameInput").val().trim();
console.log(trainName);
var destination = $("#destinationInput").val().trim();
console.log(destination);
var trainTime = $("#traintimeInput").val().trim();
console.log(trainName);
var Frequency = $("#freqInput").val().trim();
console.log(Frequency);

// Uploads train data to the database
database.ref().push({
    TrainName: trainName,
    Destination: destination,
    FirstTrainTime: trainTime,
    Frequency: Frequency
  });

// Clears all of the text-boxes
function clearData () {
$("#trainnameInput, #destinationInput, #traintimeInput, #freqInput").val("");
    return false;
}
clearData();


//Current Time

//Difference between the times

//Time apart (remainder)

//Minute Until Train

//Next Train

//Add each train's data into the table