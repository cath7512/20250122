import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCOzdxDHsFieV51R6vVvb2CI8o2_HmtpsY",
    authDomain: "mofa-46d8a.firebaseapp.com",
    projectId: "mofa-46d8a",
    storageBucket: "mofa-46d8a.firebasestorage.app",
    messagingSenderId: "457982839055",
    appId: "1:457982839055:web:ffe8984fd5d82db65b967a",
    measurementId: "G-1J7S7Y3FTG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; 