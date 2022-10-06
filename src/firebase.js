

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDoc, getDocs } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyATwzigmKPMmoGPqBDdnf_STtkgXhlixY4",
    authDomain: "ticketreservation-2c25f.firebaseapp.com",
    databaseURL: "https://ticketreservation-2c25f-default-rtdb.firebaseio.com",
    projectId: "ticketreservation-2c25f",
    storageBucket: "ticketreservation-2c25f.appspot.com",
    messagingSenderId: "514580113325",
    appId: "1:514580113325:web:6a23196344121af14b2324",
    measurementId: "G-WKZQH65M2H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
{/*const colRef = collection(db, 'Admin')

getDocs(colRef)
    .then((snapshot) => {
        console.log(snapshot.docs)
    })*/}