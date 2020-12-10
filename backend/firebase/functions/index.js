const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


exports.addUserToFirestore = functions.auth.user().onCreate(user=>{

    var doc = {
        email: user.email,
        uid: user.uid,
    }

    admin.firestore().collection('users').add(doc)

    admin.firestore().collection('cross-user-model-links').add({
      uid: user.uid,
      models:[]
    })

    admin.firestore().collection('cross-user-sheetMusic-links').add({
      uid: user.uid,
      sheets:[]
    })
    
})