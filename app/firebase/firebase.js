import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVnPEPLdDakBSf3ORCXhnyx_aB8Q4pnrw",
  authDomain: "afchat-16500.firebaseapp.com",
  projectId: "afchat-16500",
  storageBucket: "afchat-16500.appspot.com",
  messagingSenderId: "393306441258",
  appId: "1:393306441258:web:5fd6b4fc3d2d2a224d6553",
};

let app;

if (firebase?.apps?.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
