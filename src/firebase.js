import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA_2DWFusLNRjSrxJIeRkTVl4KDgLTV8JU",
    authDomain: "vibbe-83cde.firebaseapp.com",
    projectId: "vibbe-83cde",
    storageBucket: "vibbe-83cde.firebasestorage.app",
    messagingSenderId: "657273575670",
    appId: "1:657273575670:web:4ed034cd16467db124b4d7",
    measurementId: "G-9E6GWX5HF0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth & Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
