var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyDQS_8IaU_lnXxv-f2BpJBup1suIY0cdrc",
    authDomain: "eg-treasure.firebaseapp.com",
    databaseURL: "https://eg-treasure.firebaseio.com",
    projectId: "eg-treasure",
    storageBucket: "eg-treasure.appspot.com",
    messagingSenderId: "24961562392"
};
firebase.initializeApp(config);

module.exports = firebase;