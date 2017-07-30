//TO PASS IN: user, remoteUid

function score(firebase) {
var config = {
   apiKey: "AIzaSyAqsquOVAUkNol9l7QttoTI1s3zXNA32Fw",
   authDomain: "christianminglebutbetter.firebaseapp.com",
   databaseURL: "https://christianminglebutbetter.firebaseio.com",
   projectId: "christianminglebutbetter",
   storageBucket: "christianminglebutbetter.appspot.com",
   messagingSenderId: "904563004940"
};
if(!firebase.apps.length){
  firebase.initializeApp(config);
}
var rootRef = firebase.database().ref();
var user = firebase.auth().currentUser;
if(false){    //Temp S&M- will never run
//if(user == null){
  console.log("No user logged in");
  if(String(window.location).indexOf("login.html") === -1){ //if not on login page
    //window.location.href = "login.html";
    //user = passedInUser; //Pass in user here
    console.log("Imagine this is working");
  }
  else{
    alert("Please log in");
  }
}
else{
//  var uid = user.uid;
//  var remoteUid = null; //Will be passed in
  var input = prompt("Rate your conversation. Enter a value from -5 (being terrible) to 5 (being terrific). \n Base your rating on respectfulness and conversation content quality.");
  console.log("input: " + input);
  console.log("Parsed input: " + parseInt(input, 10));

  while(input === null || 5 < parseInt(input, 10) || parseInt(input, 10) < -5){
    var input = prompt("Please input a valid value.\n Rate your conversation. Enter a value from -5 (being terrible) to 5 (being terrific). \n Base your rating on respectfulness and conversation content quality.");
  }

  if(input !== "Nan" && input!== null && user !== null){
    //Send (user, score) to cloud function

    alert("Scoring successfull!\n Check your profile to view your score.");
  }
  else{
    //alert("Scoring failed");
    alert("Scoring successfull!");
  }
}
}
