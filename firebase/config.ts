// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3TrjRcgBekyecnjue7VtdJ56qNKk8Wb8",
  authDomain: "kids-app-33681.firebaseapp.com",
  projectId: "kids-app-33681",
  storageBucket: "kids-app-33681.appspot.com",
  messagingSenderId: "1068450981368",
  appId: "1:1068450981368:web:dea658b7ea53704c58220d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app };
