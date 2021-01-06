import firebase from 'firebase';
import 'firebase/firestore'
 
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCmBSrnYxNf7mBy0q1OkFIBruNFNCDOYc0",
    authDomain: "africanchau.firebaseapp.com",
    databaseURL: "https://africanchau-default-rtdb.firebaseio.com",
    projectId: "africanchau",
    storageBucket: "africanchau.appspot.com",
    messagingSenderId: "845101660289",
    appId: "1:845101660289:web:1d32a671d107c34b2eb580",
    measurementId: "G-2N7V2G41S8"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebaseApp.firestore().settings({ timestampsInSnapshots: true})
//   firebase.analytics();

export default firebaseApp.firestore()