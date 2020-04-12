var firebase = require("firebase-admin");
const fs = require('fs');

var serviceAccount = require("./serviceAccount.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://web-maroon-folder.firebaseio.com/"
});

var db = firebase.database();
var ref = db.ref("/data");

var usersRef = ref.child("content");

usersRef.on("value", function(snapshot) {
    // console.log(snapshot.val());
    fs.writeFileSync('./data.json', JSON.stringify(snapshot.val()))
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

const userOperation={
    sendJSON(req, res) {
        console.log("HI");
        ref.once("value", function(snapshot) {
            console.log(snapshot.val());
        });
        var usersRef = ref.child("content");
        usersRef.set(req.body);
    },
    getJSON() {
        var usersRef = ref.child("content");

        usersRef.on("value", function(snapshot) {
            // console.log(snapshot.val());
            fs.writeFileSync('./data.json', JSON.stringify(snapshot.val()))
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }
};
module.exports = userOperation;
