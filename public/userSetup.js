//Add the folowing two lines to index.html:
//<script src="https://www.gstatic.com/firebasejs/4.1.5/firebase.js"></script>
//<script src="userSetup.js" charset="utf-8"></script>

//Manually change this var to add the currentUser an additional time (Donald Trump is already in FIrebase)
var isNewUser = false;
var config = {
   apiKey: "AIzaSyAqsquOVAUkNol9l7QttoTI1s3zXNA32Fw",
   authDomain: "christianminglebutbetter.firebaseapp.com",
   databaseURL: "https://christianminglebutbetter.firebaseio.com",
   projectId: "christianminglebutbetter",
   storageBucket: "christianminglebutbetter.appspot.com",
   messagingSenderId: "904563004940"
};
firebase.initializeApp(config);
var rootRef = firebase.database().ref();

function authHandler(error) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload");
  }
}

var email = "dtrump@mailinator.com";
var password = "DonaldWins2016";
firebase.auth().signInWithEmailAndPassword(email, password).then(function(value){
  var user = firebase.auth().currentUser;
  console.log("User: " + user);

  if(user != null) {
    uid = user.uid;
    console.log(user);
    if (isNewUser) {
      rootRef.child("Users").child(uid).set({
        name: "Donald Trump",
        photoUrl: "https://static4.businessinsider.com/image/56c640526e97c625048b822a-480/donald-trump.jpg",
        doB: "6/14/1946",
        party: "Republican",
        education: "Wharton School of the University of Pennsylvania",
        religion: "Lutheran",
        race: "Caucasian",
        quote: "The security aspect of cyber is very, very tough. And maybe, it's hardly doable.",
        strengths: "Being president",
        weaknesses: "Media"
      });
    }
  }
  else{
    console.log("User not loggged in");
  }
}).catch(function(error){
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log("ErrorCode: " + errorCode);
  console.log("ErrorMessage: " + errorMessage);
});
