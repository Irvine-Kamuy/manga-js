import { initializeApp } from "firebase/app";
import { collection, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAPh25nVCZeG4c1BjoPYj_usMxldG2gId8",
  authDomain: "manga-62981.firebaseapp.com",
  projectId: "manga-62981",
  storageBucket: "manga-62981.appspot.com",
  messagingSenderId: "89107114266",
  appId: "1:89107114266:web:8f5c737beb733af8a324a3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const mangasRef = collection(db, 'mangas');
export const blogsRef = collection(db, 'blogs');
