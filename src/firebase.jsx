// firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Only import getAnalytics if on client
const isBrowser = typeof window !== "undefined";
let analytics;

const firebaseConfig = {
  apiKey: "AIzaSyAecGyZ9tulhpB6lS0HXbpHdwcoVUtoZrw",
  authDomain: "sci-neettoppers.firebaseapp.com",
  databaseURL: "https://sci-neettoppers-default-rtdb.firebaseio.com",
  projectId: "sci-neettoppers",
  storageBucket: "sci-neettoppers.firebasestorage.app",
  messagingSenderId: "244892523415",
  appId: "1:244892523415:web:62b34df3a68b5158e982d2",
  measurementId: "G-RSH6Q7W7ES",
};

const app = initializeApp(firebaseConfig);

// Only get analytics if running in the browser
if (isBrowser) {
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  });
}

export const auth = getAuth(app);
export { app, analytics };
