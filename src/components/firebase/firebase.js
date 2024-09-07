import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCPz9XBQLz0VJi9jlAR7wI1iB_DAg0FX4",
  authDomain: "filmyverse-245c1.firebaseapp.com",
  projectId: "filmyverse-245c1",
  storageBucket: "filmyverse-245c1.appspot.com",
  messagingSenderId: "428876382854",
  appId: "1:428876382854:web:f166752497559289d9c707",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");

export default app;
