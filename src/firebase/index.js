import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDjPWm8OsEZgP6aKyxzVVisNme-3PNMOWk",
  authDomain: "dental-reactjs.firebaseapp.com",
  databaseURL: "https://dental-reactjs.firebaseio.com",
  projectId: "dental-reactjs",
  storageBucket: "dental-reactjs.appspot.com",
  messagingSenderId: "94033655044",
  appId: "1:94033655044:web:c4fdc81874633ecb690c51",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
