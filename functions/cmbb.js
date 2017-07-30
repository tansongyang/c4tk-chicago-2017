const firebase = require('firebase');
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
//admin.initializeApp(functions.config().firebase);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

function lookupMyInfo(TheRequest) {
    return firebase.database().ref('/Users/' + TheRequest.id)
    .once('value')
    .then(function (snapshot) {
        
        var myEducation = snapshot.child("education").val(); // "University of Awesomeness"
        var myReligion = snapshot.child("r3eligion").val(); // "Methodist"
        //var myAge = snapshot.child("doB")
        var myGender = snapshot.child("gender").val(); // "Male"
        var myParty = snapshot.child("party").val();
        var myRace = snapshot.child("race").val();
        
        return snapshot;

    });
}
function matchUsers(id) {
    return firebase.database().ref('/Users')
        .once('value')
        .then(function (snapshot) {
            var users = snapshot.val();
            var userArray = [];
            var differencePoint = 0.2;
            var differenceValues = [];
            for (var key in users) {
                if (key !== id) {
                var user = users[key];
                var difference = 0;
                userArray.push(user);
                if (user.education !== lookupMyInfo.myEducation) {
                    difference += differencePoint;
                }
                if (user.religion !== lookupMyInfo.myReligion) {
                    difference += differencePoint;
                }
                if (user.gender !== lookupMyInfo.myGender) {
                    difference += differencePoint;
                }
                if (user.party !== lookupMyInfo.myParty) {
                    difference += differencePoint;
                }
                if (user.race !== lookupMyInfo.myRace) {
                    difference += differencePoint;
                }

                differenceValues.push({id: key, difference:difference});
            }
            
            }
            sortedList = differenceValues.sort(function (a, b) {
            return a.difference - b.difference;
            });
            topTen = sortedList.slice(0,9)
            var rand = topTen[Math.floor(Math.random() * topTen.length)].id;


            return rand;
        });

}


// module.exports = lookupMyInfo;
// module.exports = matchUsers;
// //module.exports = makeAMatch;

exports.handler = function(req, res) {
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

    matchUsers(req.id).then(function(rand) {
        res.status(200).send(rand);
    });
});
}