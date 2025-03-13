import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCxXu68j5U6bjk-sG__CD7Ts9ycZt-etpw",
    authDomain: "chatbot-app-68f2b.firebaseapp.com",
    projectId: "chatbot-app-68f2b",
    storageBucket: "chatbot-app-68f2b.firebasestorage.app",
    messagingSenderId: "325336642050",
    appId: "1:325336642050:web:10b321fa03b8336600ed1b",
    measurementId: "G-QGP8MBR583"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, provider, signInWithPopup, signOut };
