 
  var config = {
    apiKey: "AIzaSyBWz9o7ky_LLuDQak9lJ-rM8yRh9GwT4cI",
    authDomain: "train-app-5825a.firebaseapp.com",
    databaseURL: "https://train-app-5825a.firebaseio.com",
    projectId: "train-app-5825a",
    storageBucket: "train-app-5825a.appspot.com",
    messagingSenderId: "291641714059"
  };
  firebase.initializeApp(config);


var database = firebase.database();

var name = "";
var Destination = "";
var First_train = 0;
var trainInput = ""
var Frequency = 0;
var currentTime = "";
var DiffTime = 0;
var tRemainder = 0;
var tMinutesTillTran = 0;
var nextTrain = 0; 

$("#submit").on("click", function(event){

  trainInput = moment($("#First_train").val().trim(), "HH:mm").format("HH:mm");


  name = $("#name").val().trim();
  Destination = $("#Destination").val().trim();
  First_train = trainInput;
  Frequency = $("#Frequency").val().trim();

  database.ref().push({

    name: name,
    Destination: Destination,
    First_train: First_train,
    Frequency: Frequency,

  })
})

    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().Destination);
      console.log(childSnapshot.val().First_train);
      console.log(childSnapshot.val().Frequency);

        trainName = childSnapshot.val().name;
        trainDest = childSnapshot.val().Destination;
       trainTime = moment(childSnapshot.val().First_train, "HH:mm");
       trainFreq = childSnapshot.val().Frequency;

       // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment().format("hh:mm");
    console.log("CURRENT TIME: " + currentTime);

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + nextTrain);


      // full list of items to the well
      $("#train-list").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

  

    

  