const firebase = require('firebase');
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const admin = require('firebase-admin');
//admin.initializeApp(functions.config().firebase);
var config = {
    apiKey: "AIzaSyAqsquOVAUkNol9l7QttoTI1s3zXNA32Fw",
    authDomain: "christianminglebutbetter.firebaseapp.com",
    databaseURL: "https://christianminglebutbetter.firebaseio.com",
    projectId: "christianminglebutbetter",
    storageBucket: "christianminglebutbetter.appspot.com",
    messagingSenderId: "904563004940"
};

firebase.initializeApp(config);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

function lookupUsers() {
    return firebase.database().ref('/Users')
        .once('value')
        .then(function (snapshot) {
            var users = snapshot.val();
            return JSON.stringify(users)
        });

}
module.exports = lookupUsers;

exports.cmbb = functions.https.onRequest((req, res) => {
    // Read database for users who are looking for mixmates
    // Read your data for info
    // Scan all users and find differences:
    // (Set your set of info to 1.0 and divide by 6. Each time
    //	someone is similar to you, add that. 0 is good, 1 is bad)

    cors(req, res,() =>
{


    if (req.method === 'PUT') {
        res.status(403).send('Forbidden!');
    }

    lookupUsers.then(function(json){
        res.status(200).send(json);
    })
});
});