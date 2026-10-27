// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxKbuUUPPWvGTM3VtR7t-r8_WZjrSjoNg",
  authDomain: "robopix-52d92.firebaseapp.com",
  projectId: "robopix-52d92",
  storageBucket: "robopix-52d92.firebasestorage.app",
  messagingSenderId: "212334478299",
  appId: "1:212334478299:web:8a015c89c385a186209dfe",
  measurementId: "G-E85BYRZJLZ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics, firebaseConfig };
