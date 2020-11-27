// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDbHw_94cnmW9CIDjjHSgv14DpNHyqte-g",
    authDomain: "hactuallychat.firebaseapp.com",
    databaseURL: "https://hactuallychat.firebaseio.com",
    projectId: "hactuallychat",
    storageBucket: "hactuallychat.appspot.com",
    messagingSenderId: "802236610501",
    appId: "1:802236610501:web:3aa3c08f494b58b093bdac",
    measurementId: "G-ENYWXK8EXG"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;