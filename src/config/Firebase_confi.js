import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD2W1UlJvUEzlKW8gAiRdM_wnKxB-q3n6k",
    authDomain: "githuproject.firebaseapp.com",
    projectId: "githuproject",
    storageBucket: "githuproject.appspot.com",
    messagingSenderId: "474026154092",
    appId: "1:474026154092:web:94cfdef33d3ec6e2b76049",
    measurementId: "G-5VH4KY8QCD",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
