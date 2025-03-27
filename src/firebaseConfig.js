import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCZA-rid6L9QVf8LqCjgZJv-7NmVP7kBY4",
    authDomain: "billarbot.firebaseapp.com",
    projectId: "billarbot",
    storageBucket: "billarbot.firebasestorage.app",
    messagingSenderId: "97577634429",
    appId: "1:97577634429:web:603c77a1def57e2a117f14"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, provider, signInWithPopup, signOut };
