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
$("#submitclick").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#trainnameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var trainTime = $("#traintimeInput").val().trim();
    var Frequency = $("#freqInput").val().trim();


    // Uploads train data to the database
    database.ref().push({
        TrainName: trainName,
        Destination: destination,
        FirstTrainTime: trainTime,
        Frequency: Frequency
    });
});

database.ref().on("child_added", function (childSnapshot) {

    //pulling data back from firebase and placing into variables
    var fireTrain = childSnapshot.val().TrainName;
    var fireDestination = childSnapshot.val().Destination;
    var fireFirst = childSnapshot.val().FirstTrainTime;
    var fireFrequency = childSnapshot.val().Frequency;

    //Time
    var startTimeConverted = moment(fireFirst, "hh:mm").subtract(1, "years");

    //Difference between the times
    var differenceTime = moment().diff(moment(startTimeConverted), "minutes");

    //remainder
    var remainder = differenceTime % fireFrequency;

    //minutes until train
    var minutesUntillTrain = fireFrequency - remainder;

    //Next Train
    var nextTrain = moment().add(minutesUntillTrain, "minutes");

    var tillTrain = moment(nextTrain).format("HH:mm");

    //Add each train's data into the table
    $("#moreTrains").append(
        '<tr><td>' + fireTrain +
        '</td><td>' + fireDestination +
        '</td><td>' + fireFrequency +
        '</td><td>' + tillTrain +
        '</td><td>' + remainder + ' </td></tr>');

    // Clears all of the text-boxes
    $("#trainnameInput").val("");
    $("#destinationInput").val("");
    $("traintimeInput").val("");
    $("#freqInput").val("");

    return false;
});