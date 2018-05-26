var admin = require("firebase-admin");

var serviceAccount = require("../eg-treasure-firebase-adminsdk-oknp4-5c79833cdd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://eg-treasure.firebaseio.com"
});

var db = admin.database();

module.exports = db;