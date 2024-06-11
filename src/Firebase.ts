// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD5hEwfxoto7hMyNL-qTzgo1scw6mw56Cw",
    authDomain: "duett-7281f.firebaseapp.com",
    projectId: "duett-7281f",
    storageBucket: "duett-7281f.appspot.com",
    messagingSenderId: "31774359069",
    appId: "1:31774359069:web:8303550be07f40af5cd0f4",
    measurementId: "G-LVL1BXNB0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// @ts-ignore
const analytics = getAnalytics(app);