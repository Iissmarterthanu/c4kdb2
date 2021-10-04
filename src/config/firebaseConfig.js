import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDMXf17vF_IqMg90rkzCpdfPozUkEMVTpA",
  authDomain: "crown-db-1f1b5.firebaseapp.com",
  databaseURL: "https://crown-db-1f1b5.firebaseio.com",
  projectId: "crown-db-1f1b5",
  storageBucket: "crown-db-1f1b5.appspot.com",
  messagingSenderId: "389282566880",
  appId: "1:389282566880:web:e14a49488d3516b346f685",
  measurementId: "G-3R5KGZBKY2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };