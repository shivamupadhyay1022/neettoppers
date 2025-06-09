// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAecGyZ9tulhpB6lS0HXbpHdwcoVUtoZrw",
  authDomain: "sci-neettoppers.firebaseapp.com",
  databaseURL: "https://sci-neettoppers-default-rtdb.firebaseio.com",
  projectId: "sci-neettoppers",
  storageBucket: "sci-neettoppers.firebasestorage.app",
  messagingSenderId: "244892523415",
  appId: "1:244892523415:web:62b34df3a68b5158e982d2",
  measurementId: "G-RSH6Q7W7ES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const auth = getAuth(app);