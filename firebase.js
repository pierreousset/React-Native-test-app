import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBsPSqfB2S3uUnrS_ZuBkKji2RkXMF2fHY",
    authDomain: "sportdb-8b027.firebaseapp.com",
    databaseURL: "https://sportdb-8b027.firebaseio.com",
    projectId: "sportdb-8b027",
    storageBucket: "sportdb-8b027.appspot.com",
    messagingSenderId: "408280996457",
    appId: "1:408280996457:web:55408d37356789e4"
};

export const fire = firebase.initializeApp(firebaseConfig);

export const db = firebase.database();