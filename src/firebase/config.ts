// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDEREeK6gn7Ip89rI4HrBxPALnMw59H1rI",
    authDomain: "sportsqna-f60da.firebaseapp.com",
    projectId: "sportsqna-f60da",
    storageBucket: "sportsqna-f60da.appspot.com",
    messagingSenderId: "602182857515",
    appId: "1:602182857515:web:fe1724538ce6cb2f24cb6e",
    measurementId: "G-S9JXZPD62W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };
