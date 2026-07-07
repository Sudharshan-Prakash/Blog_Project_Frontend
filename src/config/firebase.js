// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBb4AaooymCRJwazcCNELqRGYizVx-8dJ8",
  authDomain: "blog-app-4cf72.firebaseapp.com",
  projectId: "blog-app-4cf72",
  storageBucket: "blog-app-4cf72.firebasestorage.app",
  messagingSenderId: "253705105605",
  appId: "1:253705105605:web:55b651af47b2b92bd280ac",
  measurementId: "G-ELNPETQP0W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // ← must be a named export
export default app;