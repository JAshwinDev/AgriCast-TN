import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDoYe4n2LuTZ3PHkNaF9HOWcp8iNJomjZ4",
  authDomain: "agricast-tn.firebaseapp.com",
  databaseURL: "https://agricast-tn-default-rtdb.firebaseio.com",
  projectId: "agricast-tn",
  storageBucket: "agricast-tn.firebasestorage.app",
  messagingSenderId: "1031443791377",
  appId: "1:1031443791377:web:2e2a92ff227bb9fd6ffbb0",
  measurementId: "G-S0RP930KNP"
};

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { app, analytics };