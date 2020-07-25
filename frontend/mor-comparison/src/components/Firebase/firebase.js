import app from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBepGMXG2QS5B_JnWTZN1FpCR8MI32ySa0",
    authDomain: "mor-model-comparison.firebaseapp.com",
    databaseURL: "https://mor-model-comparison.firebaseio.com",
    projectId: "mor-model-comparison",
    storageBucket: "mor-model-comparison.appspot.com",
    messagingSenderId: "740943593150",
    appId: "1:740943593150:web:181a8a01c08a2d8bf328ef"

  };

class Firebase {
    constructor(){
        app.initializeApp(firebaseConfig)
        this.auth = app.auth()
        this.db = app.firestore()
    }
}

export default Firebase