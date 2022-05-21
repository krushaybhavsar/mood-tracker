import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
console.warn = () => {};

const firebaseConfig = {
  apiKey: "AIzaSyAIgyAhydSyoazoAunuHYHkKus2qLbGOC8",
  authDomain: "mood-tracker-597b9.firebaseapp.com",
  projectId: "mood-tracker-597b9",
  storageBucket: "mood-tracker-597b9.appspot.com",
  messagingSenderId: "1097802454731",
  appId: "1:1097802454731:web:b4c527b2232dbd3ad82d4e",
};

let app: any;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage, app };
