import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Export Firebase authentication methods
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();
// Add more authentication providers as needed (e.g., Facebook, Twitter)